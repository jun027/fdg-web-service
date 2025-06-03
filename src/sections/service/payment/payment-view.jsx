'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { FaRegCopy } from 'react-icons/fa6'
import { useForm, Controller } from 'react-hook-form'
import { DONATE_ACCOUNT } from '@/constants/common'
import payFormService from '@/services/donate/payform'
import lightingLampService from '@/services/lighting-lamp/payform'
import guangmingService from '@/services/guangming/payform'
import replenishService from '@/services/replenish/payform'
import toast from 'react-hot-toast'

function PaymentView({ totalAmount, onCancel, serviceType, context }) {
  const router = useRouter()

  const { control, trigger, getValues } = useForm({
    defaultValues: {
      accountDigits: '',
    },
  })

  const handleConfirm = async () => {
    const isValid = await trigger('accountDigits')
    if (isValid) {
      const accountDigits = getValues('accountDigits')

      const payload = {
        service_list: Array.isArray(context.getData().service_list)
          ? context.getData().service_list
          : [],
        payform: {
          ...context.getData().payform,
          pay_extra: {
            ...context.getData().payform.pay_extra,
            bank_5last: accountDigits,
          },
        },
      }

      console.log('payment view paload: ', payload)

      try {
        switch (serviceType) {
          case 'lighting-lamp':
            await lightingLampService(payload)
            break
          case 'guangming':
            await guangmingService(payload)
            break
          case 'replenish':
            await replenishService(payload)
            break
          default:
            await payFormService(payload)
            break
        }
        toast.success('付款成功！')
        context.clearData()
        router.push('/service/complete')
      } catch (error) {
        console.error('API 錯誤：', error)
        toast.error('付款失敗，請稍後再試')
      }
    } else {
      toast.error('請正確填寫帳戶後五碼')
    }
  }

  const handleCopyButtonClick = useCallback(() => {
    navigator.clipboard.writeText(DONATE_ACCOUNT)
    toast.success('已複製')
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl py-6 w-[343px] lg:w-[596px] flex flex-col items-center space-y-4">
        <h2 className="text-center desktop-regular-h5 text-dark-900">
          付款金額 <span className="text-red-600 desktop-regular-h5">${totalAmount}</span>
        </h2>

        <Image
          src="/images/popup.png"
          alt="QR Code"
          width={300}
          height={300}
          className="w-[150px]"
        />

        <Controller
          name="accountDigits"
          control={control}
          rules={{
            required: '請填寫帳戶後五碼',
            pattern: {
              value: /^\d{5}$/,
              message: '帳戶後五碼格式錯誤',
            },
          }}
          render={({ field, fieldState }) => (
            <input
              {...field}
              type="text"
              placeholder="請填寫帳戶後五碼"
              className={` w-[230px] border rounded py-3 px-4 text-center desktop-regular-p text-dark-500  ${
                fieldState.error
                  ? 'border-red-500 bg-[#FFECEC] focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary-500'
              }`}
            />
          )}
        />
        <div className="flex flex-col items-center gap-y-1.5">
          <p className="text-dark-900 desktop-regular-h6 ">銀行匯款帳戶：</p>

          <div className="flex gap-x-2 items-center">
            <button type="button" onClick={handleCopyButtonClick}>
              <FaRegCopy size={20} className="text-primary-800" />
            </button>
            <p
              role="button"
              className="desktop-regular-h6 text-dark-900"
              onClick={handleCopyButtonClick}
            >
              {DONATE_ACCOUNT}
            </p>
          </div>
        </div>
        <div className="flex space-x-2.5 lg:px-8">
          <button
            className="w-[150px] h-[44px] lg:w-[261px] border border-primary-800 desktop-regular-p text-primary-800 rounded"
            onClick={onCancel}
          >
            取消
          </button>
          <button
            className="w-[150px] h-[44px] lg:w-[261px] bg-primary-800 text-white rounded desktop-regular-p"
            onClick={handleConfirm}
          >
            確認
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentView
