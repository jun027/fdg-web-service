'use client'

import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'

import resetMailService from '@/services/auth/resetMail'
import FieldTitle from '@/components/hook-form/field-title'
import FormProvider from '@/components/hook-form/form-provider'
import FormTitle from '@/components/hook-form/form-title'
import { RHFSelect } from '@/components/hook-form/rhf-select'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormHelperText, MenuItem, Select } from '@mui/material'
import { useCountryTown } from '@/hook/use-country-town'
import { useAuthContext } from '@/auth/hooks'
import updateMemberInfoService from '@/services/member/updateMemberInfo'
import { useLoadingBackdropContext } from '@/store/backdrop/use-loading-backdrop-context'
import { palette } from '@/style/config'

function ProfileView({ countryOptions: initialCountryOptions = [], areaMap: initialAreaMap = {} }) {
  const { setLoading } = useLoadingBackdropContext()

  const { countryOptions, areaOptions, onCityChange } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  const { user, checkUserSession } = useAuthContext()

  const schema = z.object({
    name: z.string().min(1, '姓名不得為空').max(10, '姓名最多10個字'),
    phone: z
      .string()
      .min(1, '聯絡手機不得為空')
      .regex(/^09\d{8}$/, '請輸入正確的手機號碼格式'),
    email: z.string(),
    city: z.union([z.string().min(1, '請選擇縣市'), z.number()]),
    district: z.union([z.string().min(1, '請選擇地區'), z.number()]),
    address: z.string().min(1, '地址不得為空'),
  })

  const defaultValues = {
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    city: '',
    district: '',
    address: user?.address || '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods

  const city = watch('city')
  const email = watch('email')

  const onSubmitButtonClick = useCallback(
    async (data) => {
      const payload = {
        name: data.name,
        phone: data.phone,
        city: data.city,
        area: data.district,
        address: data.address,
        email: data.email,
      }

      const { code, message } = await updateMemberInfoService(payload)

      if (code === 0) {
        toast.success(message)
        await checkUserSession()
      } else {
        toast.error(message)
      }
    },
    [checkUserSession]
  )

  const handleCityChange = useCallback(
    (e) => {
      setValue('city', e.target.value)
      onCityChange(e.target.value)
      setValue('district', '')
    },
    [onCityChange, setValue]
  )

  const handleCancelButtonClick = useCallback(() => {
    setValue('name', user?.name || '')
    setValue('phone', user?.phone || '')
    setValue('email', user?.email || '')
    setValue('city', user?.city || '')
    onCityChange(user?.city || '')
    setValue('district', user?.area || '')
    setValue('address', user?.address || '')
  }, [setValue, user, onCityChange])

  const handleSendModifyPasswordLinkButtonClick = useCallback(async () => {
    setLoading(true)

    const payload = {
      email,
    }

    try {
      const response = await resetMailService(payload)

      toast.success(response.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [email, setLoading])

  useEffect(() => {
    if (user) {
      setValue('city', user.city)
      onCityChange(user.city)
      setValue('district', user.area)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-12 lg:max-w-[530px] lg:mx-auto">
      <FormProvider
        className="space-y-9 lg:space-y-9"
        methods={methods}
        onSubmit={handleSubmit(onSubmitButtonClick)}
      >
        <div className="space-y-3 lg:space-y-9">
          <div className="flex justify-between items-end">
            <FieldTitle
              title="會員基本資料"
              sideColor="bg-primary-800"
              textClass="text-primary-800"
            />
            <button
              type="button"
              className="desktop-regular-p text-dark-600 underline underline-offset-2 btn-hover"
              onClick={handleSendModifyPasswordLinkButtonClick}
            >
              發送密碼修改連結
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <FormTitle title="姓名" />
              <div className="flex gap-x-6 items-center">
                <div className="flex-1">
                  <RHFTextField name="name" type="text" placeholder="請輸入姓名" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <FormTitle title="手機" />
              <RHFTextField name="phone" type="text" placeholder="請輸入手機號碼" />
            </div>

            <div className="space-y-2">
              <FormTitle title="電子信箱（Email）" />
              <RHFTextField disabled name="email" type="email" placeholder="請輸入 Email" />
            </div>

            {/* City & District & Address */}
            <div className="space-y-2 lg:space-y-3">
              <FormTitle title="通訊地址" />

              <div className="space-y-2 lg:flex lg:flex-row lg:space-y-0 lg:gap-x-3">
                {/* City */}
                <div className="lg:w-full">
                  <div>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      displayEmpty
                      fullWidth
                      value={city}
                      onChange={handleCityChange}
                      sx={{
                        '&.Mui-focused': {
                          '.MuiOutlinedInput-notchedOutline': {
                            borderWidth: '1px',
                            borderColor: '#ADB5BD',
                          },
                        },
                      }}
                      inputProps={{
                        sx: {
                          background: palette.common.white,
                          padding: '12px 16px',
                        },
                      }}
                      error={!!errors.city}
                    >
                      {countryOptions.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  {errors.city && (
                    <FormHelperText sx={{ marginX: '14px' }} error>
                      {errors.city.message}
                    </FormHelperText>
                  )}
                </div>

                {/* District */}
                <div className="lg:w-full">
                  <RHFSelect name="district">
                    {areaOptions.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </div>
              </div>

              {/* Address */}
              <RHFTextField name="address" type="text" placeholder="請輸入地址" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 lg:flex-row-reverse lg:justify-center lg:gap-y-0 lg:gap-x-6">
          <button
            type="submit"
            className="btn-solid btn-hover py-4 bg-primary-800 lg:flex-1"
            disabled={isSubmitting}
          >
            儲存
          </button>
          <button
            type="reset"
            className="btn-outline btn-hover py-4 lg:flex-1"
            onClick={handleCancelButtonClick}
            disabled={isSubmitting}
          >
            取消修改
          </button>
        </div>
      </FormProvider>
    </div>
  )
}

export default ProfileView
