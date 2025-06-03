'use client'

import Image from 'next/image'
import Link from 'next/link'
import { z } from 'zod'
import { MdOutlineVisibility, MdVisibilityOff } from 'react-icons/md'
import { useForm } from 'react-hook-form'

import { useGoogleLogin } from '@react-oauth/google'
import PageTitle from '@/components/hook-form/page-title'
import FormProvider from '@/components/hook-form/form-provider'
import FormTitle from '@/components/hook-form/form-title'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { PATHS } from '@/routes/page'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, InputAdornment } from '@mui/material'
import { useBoolean } from '@/hook/use-boolean'
import { useRouter } from '@/routes/hooks'
import registerService from '@/services/auth/register'
import usePicValidateCode from '@/hook/use-pic-validate-code'
import { IoMdRefresh } from 'react-icons/io'
import PicAuthCode from '@/utils/pic-auth-code'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

function SignupView() {
  const router = useRouter()

  const { value: showPassword, onToggle: showPasswordToggle } = useBoolean(false)

  const { value: showConfirmPassword, onToggle: showConfirmPasswordToggle } = useBoolean(false)

  const { authCode, codeHandler, picAuthCodeRef } = usePicValidateCode()

  const schema = z
    .object({
      account: z.string().min(1, '帳號不得為空').min(8, '帳號最少 8 個字元'),
      email: z.string().min(1, '電子信箱不得為空').email(),
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
      validateCode: z
        .string()
        .min(1, '請輸入驗證碼')
        .refine((val) => val === authCode, '驗證碼錯誤'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '密碼與確認密碼不一致',
      path: ['confirmPassword'],
    })

  const defaultValues = {
    account: '',
    email: '',
    password: '',
    confirmPassword: '',
    validateCode: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const onSubmitButtonClick = async (data) => {
    const payload = {
      username: data.account,
      password: data.password,
      email: data.email,
    }

    await registerService(payload)

    router.push(PATHS.Auth.child.Login.path)

    toast.success('註冊成功')
  }

  const handleRefreshAuthCode = useCallback(() => {
    picAuthCodeRef.current.onRefresh()
  }, [picAuthCodeRef])

  const onGoogleSignupClick = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    onSuccess: async (tokenResponse) => {
      const { code } = tokenResponse

      // Google 註冊
      console.log('code: ', code)
    },
    onError: () => {
      console.log('Signup from google failed')
    },
  })

  return (
    <div className="max-w-650 mx-auto flex items-center px-4 py-6 min-h-[1050px] h-[calc(100dvh-96px-604px)] lg:max-w-[722px] lg:px-10 lg:py-12 lg:min-h-[1046px] lg:h-[calc(100dvh-94px-353px)] lg:max-h-[1000px]">
      <div className="bg-white px-4 py-6 rounded-2xl border-dark-400 border-1 lg:p-6 lg:rounded-2xl lg:max-w-[450px] lg:mx-auto w-full">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitButtonClick)}>
          {/* Title */}
          <PageTitle title="會員註冊" />

          <div className="space-y-4 mt-3 mb-8">
            {/* Account */}
            <div className="space-y-2">
              <FormTitle musted title="會員帳號" />
              <RHFTextField
                disabled={isSubmitting}
                name="account"
                type="text"
                placeholder="請輸入至少 8 位元"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <FormTitle musted title="電子信箱" />
              <RHFTextField
                disabled={isSubmitting}
                name="email"
                type="email"
                placeholder="請輸入您的Email"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <FormTitle musted title="密碼" />
              <RHFTextField
                disabled={isSubmitting}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="請輸入您的密碼"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          disabled={isSubmitting}
                          aria-label="toggle password visibility"
                          onClick={showPasswordToggle}
                          edge="end"
                        >
                          {showPassword ? (
                            <MdVisibilityOff color="#c1c1c1" />
                          ) : (
                            <MdOutlineVisibility color="#c1c1c1" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <FormTitle musted title="確認密碼" />
              <RHFTextField
                disabled={isSubmitting}
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="請再次輸入您的密碼"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          disabled={isSubmitting}
                          aria-label="toggle confirm password visibility"
                          onClick={showConfirmPasswordToggle}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <MdVisibilityOff color="#c1c1c1" />
                          ) : (
                            <MdOutlineVisibility color="#c1c1c1" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            {/* Validate Code */}
            <div>
              <FormTitle musted title="驗證碼" />
              <div>
                <div className="space-y-2 lg:space-y-0 lg:flex lg:flex-row lg:gap-x-2">
                  <div className="lg:flex-1">
                    <RHFTextField
                      disabled={isSubmitting}
                      name="validateCode"
                      type="text"
                      placeholder="請輸入驗證碼"
                      disabledError
                    />
                    {errors.validateCode && (
                      <p className="text-xs mt-[3px] mx-[14px] text-[#d32f2f] lg:hidden">
                        {errors.validateCode.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-start items-center flex-wrap space-x-2">
                    <PicAuthCode ref={picAuthCodeRef} code={codeHandler} />
                    <button
                      disabled={isSubmitting}
                      type="button"
                      className="desktop-regular-p text-brown-700 flex flex-row items-center gap-x-1 px-4 py-2 btn-hover"
                      onClick={handleRefreshAuthCode}
                    >
                      <span className="text-primary-800 desktop-regular-p">刷新</span>
                      <IoMdRefresh fontSize={24} className="text-primary-800" />
                    </button>
                  </div>
                </div>
              </div>
              {errors.validateCode && (
                <p className="hidden text-xs mt-[3px] mx-[14px] text-[#d32f2f] lg:block">
                  {errors.validateCode.message}
                </p>
              )}
            </div>

            {/* Social Medial Login */}
            {
              <div className="space-y-3">
                <div className="flex items-center gap-x-3">
                  <p
                    className="flex-1 h-[1px]"
                    style={{
                      background:
                        'linear-gradient(-90deg, rgba(255,255,255,0) 0%, rgba(229,232,235,1) 15%, rgba(222,226,230,1) 100%)',
                    }}
                  />
                  <h6 className="desktop-regular-h6 text-dark-900 text-center">快速註冊</h6>
                  <p
                    className="flex-1 h-[1px]"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(229,232,235,1) 15%, rgba(222,226,230,1) 100%)',
                    }}
                  />
                </div>
                <div className="flex flex-col items-stretch gap-y-3 lg:gap-x-9 lg:justify-start lg:flex-row lg:items-center">
                  {/* Google Auth */}
                  <button
                    type="button"
                    onClick={() => onGoogleSignupClick()}
                    className="border p-2 rounded-4 block bg-white hover:bg-gray-50 focus:bg-gray-50 duration-200 transition-colors lg:border-0"
                  >
                    <div className="flex justify-start gap-x-3 items-center">
                      <Image
                        className="w-8 aspect-square"
                        src="/images/icons/google-01.png"
                        alt="Google"
                        width={144}
                        height={144}
                      />
                      <p className="mobile-light-h4 lg:inline-block desktop-light-h6 text-dark-900">
                        Google
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            }
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-y-6">
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full c-btn-basic btn-hover bg-primary-500 text-white"
            >
              註冊
            </button>
            <Link
              href={PATHS.Auth.child.Login.path}
              target="_self"
              className="w-full c-btn-basic desktop-regular-h6 btn-hover bg-white text-primary-500 border-primary-500 border-1"
            >
              已有會員
            </Link>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default SignupView
