'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaRegCopy } from 'react-icons/fa6'
import { z } from 'zod'
import FormProvider from '@/components/hook-form/form-provider'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { DONATE_ACCOUNT } from '@/constants/common'
import { PATHS } from '@/routes/page'
import payFormService from '@/services/donate/payform'
import useDonateFormContext from '@/store/use-donate-form-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@/routes/hooks'

function DonatepayView() {
  const router = useRouter()

  const getData = useDonateFormContext((state) => state.getData)
  const clearData = useDonateFormContext((state) => state.clearData)

  const schema = z.object({
    account: z.string().trim().min(1, '此欄位不得為空').length(5, '需為帳戶後 5 碼'),
  })

  const defaultValues = {
    account: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmitButtonClick = useCallback(
    async (data) => {
      const payload = {
        service_list: {
          ...getData().service_list,
        },
        payform: {
          ...getData().payform,
          pay_extra: {
            ...getData().pay_extra,
            bank_5last: data.account,
          },
        },
      }

      await payFormService(payload)
      clearData()

      router.push(PATHS.Service.child.Complete.path)
    },
    [getData, router, clearData]
  )

  const handleCopyButtonClick = useCallback(() => {
    navigator.clipboard.writeText(DONATE_ACCOUNT)
    toast.success('已複製')
  }, [])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitButtonClick)}>
      <div className="py-6 lg:py-12 flex items-center justify-center bg-background">
        <div className="bg-white py-6 px-4 rounded-2xl w-full mx-auto lg:w-[1120px]">
          {/* 步驟條 */}
          <div className="flex items-center justify-center gap-x-2 sm:gap-x-3 pb-6 max-w-full mx-auto whitespace-nowrap">
            <div className="flex flex-col items-center">
              <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-white bg-primary-500 desktop-regular-h6 lg:desktop-bold-h4">
                1
              </div>
              <span className="mt-2 text-primary-500 mobile-medium-h4 lg:desktop-regular-h6">填寫資料</span>
            </div>

            <div className="text-primary-500 pb-10 flex gap-x-1 sm:gap-x-3">
              <span className="text-sm sm:text-base font-bold">_</span>
              <span className="text-sm sm:text-base font-bold">__</span>
              <span className="text-sm sm:text-base font-bold">__</span>
              <span className="text-sm sm:text-base font-bold">_</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-white bg-primary-500 mobile-bold-h3 lg:desktop-bold-h4">
                2
              </div>
              <span className="mt-2 text-primary-500 desktop-bold-p lg:desktop-bold-h6">
              支付金額
              </span>
            </div>

            <div className="text-primary-500 pb-10 flex gap-x-1 sm:gap-x-3">
              <span className="text-sm sm:text-base font-bold">_</span>
              <span className="text-sm sm:text-base font-bold">__</span>
              <span className="text-sm sm:text-base font-bold">__</span>
              <span className="text-sm sm:text-base font-bold">_</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-dark-500 border border-dark-500 desktop-regular-h6 lg:desktop-regular-h4">
                3
              </div>
              <span className="mt-2 text-dark-500 desktop-regular-p lg:desktop-regular-h6">
              感謝函
              </span>
            </div>
          </div>

          {/* 表單內容 */}
          <div className="flex flex-col items-center gap-y-6">
            <p className="text-dark-900 mobile-regular-h2">QRcode 掃描支付</p>

            <Image
              className="w-[200px]"
              src="/images/donate-qrcode.png"
              alt="qrCode"
              width={400}
              height={400}
            />

            <div className="flex flex-col items-center gap-y-3">
              <p className="text-dark-900 mobile-regular-h2">銀行匯款帳戶：</p>
              <div className="flex gap-x-2 items-center">
                <button type="button" onClick={handleCopyButtonClick}>
                  <FaRegCopy size={20} className="text-primary-500" />
                </button>
                <p
                  role="button"
                  className="text-dark-900 mobile-regular-h6"
                  onClick={handleCopyButtonClick}
                >
                  {DONATE_ACCOUNT}
                </p>
              </div>
            </div>

            <div className="w-[311px] lg:w-[410px] lg:mx-auto w-full">
              <RHFTextField name="account" placeholder="請填寫帳戶後五碼" />
              <label className="text-dark-500 block mt-2">
                注意事項：匯款完成後，請務必填寫帳戶後五碼，以便我們快速核對並加速處理您的匯款確認。感謝您的配合！
              </label>
            </div>

            <button
              type="submit"
              className="w-[192px] py-4 bg-primary-500 text-white rounded desktop-regular-h6"
            >
              完成送出
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default DonatepayView
