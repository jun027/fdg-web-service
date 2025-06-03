'use client'

import { Suspense, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { z } from 'zod'

import FormProvider from '@/components/hook-form/form-provider'
import PageTitle from '@/components/hook-form/page-title'
import { PATHS } from '@/routes/page'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from '@/routes/hooks'
import resetMailService from '@/services/auth/resetMail'
import toast from 'react-hot-toast'
import { useTimer } from 'react-timer-hook'
import clsx from 'clsx'
import { useBoolean } from '@/hook/use-boolean'

function ForgotPasswordConfirmContainer() {
  const searchParams = useSearchParams()
  const { value: isApiLoading, onTrue: apiLoadingOnTrue, onFalse: apiLoadingOnFalse } = useBoolean()
  const { isRunning, seconds, restart } = useTimer({
    autoStart: false,
    expiryTimestamp: new Date(Date.now() + 1000 * 5),
  })

  const email = searchParams.get('email')

  const schema = z.object({
    email: z.string().email('請輸入正確的 email 格式'),
  })

  const defaultValues = {
    email: email,
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmitButtonClick = useCallback(
    async (data) => {
      apiLoadingOnTrue()
      try {
        const payload = {
          email: data.email,
        }

        const response = await resetMailService(payload)
        toast.success(response.message)
        restart(new Date(Date.now() + 1000 * 5))
      } catch (error) {
        console.error('error')
      } finally {
        apiLoadingOnFalse()
      }
    },
    [restart, apiLoadingOnTrue, apiLoadingOnFalse]
  )

  return (
    <div className="max-w-650 mx-auto py-6 flex items-center min-h-[544px] h-[calc(100dvh-96px-604px)] lg:max-w-[722px] lg:px-10 lg:py-12 lg:min-h-[542px] lg:h-[calc(100dvh-94px-353px)] lg:max-h-[1000px]">
      <div className="bg-[#fcfcfc] px-4 py-12 rounded-2xl w-full lg:px-12">
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmitButtonClick)}
          className="space-y-6"
        >
          <PageTitle title="忘記密碼" />
          <div className="space-y-12">
            <div className="space-y-3">
              <p className="mobile-regular-h3 text-dark-900 lg:desktop-regular-h6">
                我們已經將復原連結傳送到您的電子信箱：
              </p>

              <p className="mobile-bold-h2 text-dark-900 lg:desktop-bold-h5">{email}</p>

              <p className="mobile-regular-h3 text-dark-900 lg:desktop-regular-h6">
                如果您尚未收到電子郵件，請檢查垃圾郵件資料夾或
                <Link
                  href={PATHS.Auth.child.SignUp.path}
                  className="underline underline-offset-2 text-blue-600"
                >
                  註冊
                </Link>
              </p>
            </div>

            <div className="space-y-6">
              <a
                href={PATHS.Auth.child.Login.path}
                className="block btn-solid btn-hover py-4 desktop-regular-h6 bg-primary-500"
              >
                返回登入
              </a>
              <button
                disabled={isApiLoading || isRunning}
                type="submit"
                className={clsx(
                  'w-full btn-outline py-4 desktop-regular-h6 text-primary-500 border-primary-500',
                  isApiLoading || isRunning ? 'opacity-70 cursor-not-allowed' : 'btn-hover'
                )}
              >
                {`重新傳送復原連結${isRunning ? `(${seconds}s)` : ``}`}
              </button>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

function ForgotPasswordConfirmView({ children }) {
  return (
    <Suspense>
      <ForgotPasswordConfirmContainer>{children}</ForgotPasswordConfirmContainer>
    </Suspense>
  )
}

export default ForgotPasswordConfirmView
