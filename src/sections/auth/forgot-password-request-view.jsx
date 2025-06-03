'use client'

import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import FormProvider from '@/components/hook-form/form-provider'
import PageTitle from '@/components/hook-form/page-title'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { PATHS } from '@/routes/page'
import { zodResolver } from '@hookform/resolvers/zod'
import resetMailService from '@/services/auth/resetMail'
import { useRouter } from '@/routes/hooks'
import toast from 'react-hot-toast'

function ForgotPasswordRequestView() {
  const router = useRouter()

  const schema = z.object({
    email: z.string().email('請輸入正確的 email 格式'),
  })

  const defaultValues = {
    email: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmitButtonClick = useCallback(
    async (data) => {
      try {
        const payload = {
          email: data.email,
        }

        const response = await resetMailService(payload)

        toast.success(response.message)

        router.push(`${PATHS.Auth.child.ForgotPassword.child.Confirm.path}?email=${data.email}`)
      } catch (error) {
        console.error('error')
      }
    },
    [router]
  )

  return (
    <div className="max-w-650 mx-auto py-6 flex items-center min-h-[448px] h-[calc(100dvh-96px-604px)] lg:max-w-[722px] lg:px-10 lg:py-12 lg:min-h-[552px] lg:h-[calc(100dvh-94px-353px)] lg:max-h-[1000px]">
      <div className="bg-[#fcfcfc] px-4 py-6 rounded-2xl w-full lg:p-12">
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmitButtonClick)}
          className="space-y-6"
        >
          <PageTitle title="忘記密碼" />
          <div className="space-y-12">
            <div className="space-y-3">
              <p className="mobile-regular-h3 text-dark-900 lg:desktop-regular-h5">
                我們將傳送復原密碼連結到您的Email
              </p>
              <RHFTextField name="email" type="email" placeholder="請輸入您的 Email" />
            </div>

            <div className="space-y-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-solid py-4 desktop-regular-h6 bg-primary-500"
              >
                傳送復原連結
              </button>
              <a
                href={PATHS.Auth.child.Login.path}
                className="block btn-outline btn-hover py-4 desktop-regular-h6 text-primary-500 border-primary-500"
              >
                返回登入
              </a>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default ForgotPasswordRequestView
