'use client'

import { Suspense, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MdOutlineVisibility, MdVisibilityOff } from 'react-icons/md'
import { useSearchParams, useRouter } from '@/routes/hooks'

import { useBoolean } from '@/hook/use-boolean'
import FormProvider from '@/components/hook-form/form-provider'
import FormTitle from '@/components/hook-form/form-title'
import PageTitle from '@/components/hook-form/page-title'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { PATHS } from '@/routes/page'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, InputAdornment } from '@mui/material'
import resetService from '@/services/auth/reset'
import toast from 'react-hot-toast'

function ResetPasswordContainer() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')
  const email = searchParams.get('mail')

  const { value: showPassword, onToggle: showPasswordToggle } = useBoolean(false)
  const { value: showConfirmPassword, onToggle: showConfirmPasswordToggle } = useBoolean(false)

  const schema = z
    .object({
      password: z
        .string()
        .min(6, '密碼至少需要 6 個字元')
        .max(12, '密碼最多 12 個字元')
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
          '密碼必須是 6 到 12 個字元的英文字母和數字組合'
        ),
      confirmPassword: z
        .string()
        .min(6, '密碼至少需要 6 個字元')
        .max(12, '密碼最多 12 個字元')
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
          '密碼必須是 6 到 12 個字元的英文字母和數字組合'
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '密碼與確認密碼不一致',
      path: ['confirmPassword'],
    })

  const defaultValues = {
    password: '',
    confirmPassword: '',
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
          password: data.password,
          code,
          valid_value: email,
        }

        const response = await resetService(payload)

        toast.success(response.message)

        router.push(PATHS.Auth.child.Login.path)
      } catch (error) {
        console.error('error')
      }
    },
    [code, email, router]
  )

  return (
    <div className="max-w-650 mx-auto py-6 flex items-center min-h-[567px] h-[calc(100dvh-96px-604px)] lg:max-w-[722px] lg:px-10 lg:py-12 lg:min-h-[663px] lg:h-[calc(100dvh-94px-353px)] lg:max-h-[1000px]">
      <div className="bg-[#fcfcfc] w-full px-4 py-6 rounded-2xl lg:p-12">
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmitButtonClick)}
          className="space-y-6"
        >
          <PageTitle title="更改密碼" />
          <div className="space-y-12">
            <div className="space-y-3">
              <div className="space-y-2">
                <FormTitle musted title="密碼" />
                <RHFTextField
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="請輸入您的密碼"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={showPasswordToggle}
                            edge="end"
                          >
                            {showPassword ? (
                              <MdVisibilityOff color="#3C7269" />
                            ) : (
                              <MdOutlineVisibility color="#3C7269" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>

              <div className="space-y-2">
                <FormTitle musted title="請再次入密碼" />
                <RHFTextField
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="再次輸入密碼"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={showConfirmPasswordToggle}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <MdVisibilityOff color="#3C7269" />
                            ) : (
                              <MdOutlineVisibility color="#3C7269" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full btn-solid py-4 desktop-regular-h6 bg-primary-500"
              >
                確認更改
              </button>
              <a
                href={PATHS.Auth.child.Login.path}
                target="_self"
                className="block btn-outline btn-hover py-4 desktop-regular-h6 text-primary-500 border-primary-500"
              >
                取消
              </a>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

function ResetPasswordView({ children }) {
  return (
    <Suspense>
      <ResetPasswordContainer>{children}</ResetPasswordContainer>
    </Suspense>
  )
}

export default ResetPasswordView
