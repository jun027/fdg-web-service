import { z } from 'zod'
import { RECEIPT_TYPE } from '../constants'

// 基礎表單欄位
//捐款人欄位

const baseSchema = z.object({
  donateAmount: z.coerce.number().min(300, '金額不得少於 300'),
  donateMethod: z.union([z.string().trim().min(1, '付款方式不得為空'), z.number()]),
  donateQuantity: z.coerce.number().min(1, '數量不得少於 1 ').max(999, '數量不得超過 999'),
  donateName: z.string().trim().min(1, '姓名不得為空').max(13, '姓名不得超過 13 個字'),
  gender: z
    .string()
    .min(1, '性別為必填')
    .refine((val) => val === 'M' || val === 'F', '請選擇正確的性別'),
  year: z.preprocess(
    (val) => Number(val),
    z.number().min(1920, '請選擇年份').max(2024, '請選擇年份')
  ),
  month: z.preprocess((val) => Number(val), z.number().min(1, '請選擇月份').max(12, '請選擇月份')),
  // Todo: 日期應該要依照月份去判斷
  day: z.preprocess((val) => Number(val), z.number().min(1, '請選擇日期').max(31, '請選擇日期')),
  donateTimeSlot: z.union([z.string().min(1, '請選擇出生時辰'), z.number()]),

  //聯絡人欄位

  contactName: z.string().trim().min(1, '姓名不得為空').max(13, '姓名不得超過 13 個字'),
  contactGender: z
    .string()
    .min(1, '性別為必填')
    .refine((val) => val === 'contactMale' || val === 'contactFemale', '請選擇正確的性別'),
  contactPhone: z
    .string()
    .min(1, '聯絡電話不得為空')
    .regex(/^(\d{10}|09\d{8})$/, '請輸入正確的號碼格式')
    .trim(),
  contactEmail: z.string().trim().email('請輸入正確的 Email 格式'),
  contactPostalCode: z
    .string()
    .min(3, '郵遞區號最少 3 位數字')
    .max(6, '郵遞區號最多 6 位數字')
    .regex(/^\d+$/, '郵遞區號只能包含數字'),
  contactCity: z.union([z.string().min(1, '請選擇縣市'), z.number()]),
  contactDistrict: z.union([z.string().min(1, '請選擇地區'), z.number()]),
  contactAddress: z.string().trim().min(1, '地址不得為空'),

  receiptType: z.string().trim().min(1, '收據類型不得為空'),
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

const schema = z.discriminatedUnion('receiptType', [receiptRequiredSchema, noReceiptSchema])

export default schema
