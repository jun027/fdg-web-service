FROM node:18-alpine AS base

# 安裝 libc6-compat 和 tzdata 來設置時區
RUN apk add --no-cache libc6-compat tzdata

# 設置時區為 Asia/Shanghai
ENV TZ=Asia/Shanghai

WORKDIR /app

# 安裝依賴
FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile --network-timeout 100000; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "未找到鎖定文件" && exit 1; \
  fi

# 需要時重新建置 node_modules
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 接收 CI/CD 中传递的 build-arg 参数
ARG MODULES_TOKEN
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GOOGLE_REDIRECT_URI
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID


# 设置环境变量，供后续构建和运行时使用
ENV MODULES_TOKEN=${MODULES_TOKEN}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_GOOGLE_REDIRECT_URI=${NEXT_PUBLIC_GOOGLE_REDIRECT_URI}
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}

RUN echo "NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL"

# 安裝依賴
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "未找到鎖定文件" && exit 1; \
  fi

# 使用 Next.js 靜態生成
FROM base AS runner
WORKDIR /app

# 設置環境變量
ENV NODE_ENV production

# 創建一個非 root 用戶
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 複製構建文件
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 確保
RUN mkdir -p .next
RUN chown nextjs:nodejs .next

# 切換到非 root 用戶
USER nextjs

# 開放端口
EXPOSE 8001

# 默認端口
ENV PORT 8001

# 啟動
CMD HOSTNAME="0.0.0.0" node server.js
