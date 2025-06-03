'use client'

import FormProvider from '@/components/hook-form/form-provider'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { PATHS } from '@/routes/page'
import { zodResolver } from '@hookform/resolvers/zod'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaWallet } from 'react-icons/fa6'
import { FaTrophy } from 'react-icons/fa6'
import { z } from 'zod'
import WalletPaymentDialog from './components/wallet-payment-dialog'

function WalletView() {
  const [open, setOpen] = useState(false)

  const handleWalletPaymentDialogOnClose = () => {
    setOpen(false)
  }

  const schema = z.object({
    amount: z.string().min(1, '輸入金額不得為空'),
  })

  const defaultValues = {
    amount: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods

  const amount = watch('amount')

  const onSubmitButtonClick = useCallback(async (data) => {
    const payload = {
      amount: data.amount,
    }

    setOpen(true)
    console.log('onSubmitButtonClick: ', payload)
  }, [])

  return (
    <>
      <div className="px-4 py-6 bg-white rounded-2xl space-y-12 lg:p-9">
        <FormProvider
          className="space-y-12"
          methods={methods}
          onSubmit={handleSubmit(onSubmitButtonClick)}
        >
          <div className="flex flex-row items-center justify-evenly lg:justify-center lg:gap-x-12">
            {/* 我的錢包 */}
            <div className="flex flex-col items-center gap-y-3">
              <div className="flex flex-row gap-x-3 items-center">
                <FaWallet size={24} className="text-primary-800" />
                <p className="desktop-regular-h5 text-primary-800">我的錢包</p>
              </div>
              <p className="text-red-600 desktop-regular-h5">$100</p>
            </div>

            {/* 累積積分 */}
            <div className="flex flex-col items-center gap-y-3">
              <div className="flex flex-row gap-x-3 items-center">
                <FaTrophy size={24} className="text-primary-800" />
                <p className="desktop-regular-h5 text-primary-800">累積積分</p>
              </div>
              <p className="text-red-600 desktop-regular-h5">10</p>
            </div>
          </div>

          <div>
            <RHFTextField name="amount" type="text" placeholder="請輸入存款金額" />
          </div>

          <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-center lg:gap-y-0 lg:gap-x-6">
            <button
              type="submit"
              className="btn-solid btn-hover py-3 bg-primary-800 lg:flex-1"
              disabled={isSubmitting}
            >
              存款
            </button>
            <Link
              href={PATHS.Home.path}
              className="btn-outline btn-hover py-3 lg:flex-1 c-btn-disabled"
              disabled={isSubmitting}
            >
              前往商城使用積分
            </Link>
          </div>
        </FormProvider>
      </div>
      <WalletPaymentDialog open={open} onClose={handleWalletPaymentDialogOnClose} amount={amount} />
    </>
  )
}

export default WalletView
