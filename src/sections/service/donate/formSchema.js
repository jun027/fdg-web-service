import { z } from 'zod'
import { RECEIPT_TYPE } from '../constants'

// 基礎表單欄位
const baseSchema = z.object({
  donateAmount: z.number().min(1, '捐款金額不得為空'),
  donateItem: z.union([z.string().min(1, '請選擇捐款項目'), z.number()]),
  donateMethod: z.union([z.string().trim().min(1, '付款方式不得為空'), z.number()]),

  customName: z
    .string()
    .trim()
    .min(1, '姓名不得為空')
    .max(13, '捐款人姓名 / 公司名稱不得超過 13 個字'),
  customIDNumber: z.string().trim().min(1, '此欄位不得為空'),
  customPhone: z
    .string()
    .min(1, '聯絡電話不得為空')
    .regex(/^(\d{10}|09\d{8})$/, '請輸入正確的號碼格式')
    .trim(),
  customEmail: z.string().trim().email('請輸入正確的 Email 格式'),
  customCity: z.union([z.string().min(1, '請選擇縣市'), z.number()]),
  customDistrict: z.union([z.string().min(1, '請選擇地區'), z.number()]),
  customAddress: z.string().trim().min(1, '地址不得為空'),

  receiptType: z.string().trim().min(1, '收據類型不得為空'),
  receiptAgreeToTerms: z.boolean().refine((v) => v, {
    message: '需要勾選此欄位',
  }),
  receiptDisagreeToPublicName: z.boolean(),
})

// 有收據的驗證規則
const receiptRequiredSchema = baseSchema.extend({
  receiptType: z.literal(RECEIPT_TYPE.PaperReceipt.value), // 假設 '1'
  receiptTitle: z.string().trim().min(1, '收據抬頭不得為空'),
  receiptCity: z.union([z.string().min(1, '請選擇縣市'), z.number()]),
  receiptDistrict: z.union([z.string().min(1, '請選擇地區'), z.number()]),
  receiptAddress: z.string().trim().min(1, '地址不得為空'),
  receiptEmail: z.string().trim().email('請輸入正確的 Email 格式'),
})

// ------------------------------------------------------------

// 不需要收據的驗證規則（不要求額外欄位）
const noReceiptSchema = baseSchema.extend({
  receiptType: z.literal(RECEIPT_TYPE.NoReceipt.value),
})

// 使用 Discriminated Union 根據 receiptType 選擇驗證規則
const schema = z.discriminatedUnion('receiptType', [receiptRequiredSchema, noReceiptSchema])

export default schema
