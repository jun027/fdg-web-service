'use client'

import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormProvider from '@/components/hook-form/form-provider'
import FieldTitle from '@/components/hook-form/field-title'
import FormTitle from '@/components/hook-form/form-title'
import { RECEIPT_TYPE, ONLINE_PAYMENT_METHODS } from '@/sections/service/constants'
import { Divider, FormHelperText, MenuItem, Select } from '@mui/material'
import { RHFRadioButton } from '@/components/hook-form/rhf-radio-button'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { useCountryTown } from '@/hook/use-country-town'
import { RHFSelect } from '@/components/hook-form/rhf-select'
import { useOptions } from '@/hook/use-options'
import PaymentButton from '@/sections/service/components/payment-button'
import schema from './formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { RHFCheckbox } from '@/components/hook-form/rhf-checkbox'
import { useAuthContext } from '@/auth/hooks'
import { useRouter } from '@/routes/hooks/use-router'
import useDonateFormContext from '@/store/use-donate-form-context'
import { PATHS } from '@/routes/page'

function DonateView({
  donateItemOptions: initialDonateItemOptions = [],
  countryOptions: initialCountryOptions = [],
  receiptTypeOptions: initialReceiptTypeOptions = [],
  areaMap: initialAreaMap = {},
}) {
  const { user } = useAuthContext()
  const router = useRouter()
  const storeFormData = useDonateFormContext((state) => state.storeFormData)
  const clearData = useDonateFormContext((state) => state.clearData)
  const {
    countryOptions: customCountryOptions,
    areaOptions: customAreaOptions,
    onCityChange: onCityChangeCustom,
  } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  const { options: donateItemOptions } = useOptions(initialDonateItemOptions, {
    value: '',
    label: '請選擇捐款項目',
  })

  const {
    countryOptions: receiptCountryOptions,
    areaOptions: receiptAreaOptions,
    onCityChange: onCityChangeReceipt,
  } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  const defaultValues = {
    donateAmount: 0,
    donateItem: '',
    donateMethod: 3,

    customName: '',
    customIDNumber: '',
    customPhone: '',
    customEmail: '',
    customCity: '',
    customDistrict: '',
    customAddress: '',

    receiptType: '1',
    receiptTitle: '',
    receiptCity: '',
    receiptDistrict: '',
    receiptAddress: '',
    receiptEmail: '',
    receiptAgreeToTerms: false,
    receiptDisagreeToPublicName: false,
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods

  const onSubmitButtonClick = useCallback(
    async (data) => {
      const payload = {
        service_list: {
          amount: data.donateAmount,
          item_id: data.donateItem,
          donate_name: data.customName,
          no_public: data.receiptDisagreeToPublicName,
        },
        payform: {
          name: data.customIDNumber,
          phone: data.customPhone,
          email: data.customEmail,
          city: data.customCity,
          area: data.customDistrict,
          address: data.customAddress,
          receipt_type: Number(data.receiptType),
          receipt_extra: {
            receipt_title: data.receiptTitle,
            receipt_city: data.receiptCity,
            receipt_area: data.receiptDistrict,
            receipt_address: data.receiptAddress,
            receipt_email: data.receiptEmail,
          },
          pay_type: data.donateMethod,
          pay_extra: {
            bank_5last: data.bank_5last,
          },
        },
      }

      storeFormData(payload)

      router.push(PATHS.Service.Donate.child.Payment.path)
    },
    [router, storeFormData]
  )

  const handlePaymentButtonClick = useCallback(
    (e) => {
      const value = e.currentTarget.getAttribute('data-value')
      methods.setValue('donateAmount', Number(value), { shouldValidate: true })
      methods.trigger('donateAmount')
    },
    [methods]
  )

  const handleReceiptCityChange = useCallback(
    (e) => {
      onCityChangeReceipt(e.target.value)
      setValue('receiptCity', e.target.value)
      setValue('receiptDistrict', '')
      methods.trigger('receiptCity')
    },
    [methods, onCityChangeReceipt, setValue]
  )

  const handleCustomCityChange = useCallback(
    (e) => {
      onCityChangeCustom(e.target.value)
      setValue('customCity', e.target.value)
      setValue('customDistrict', '')
      methods.trigger('customCity')
    },
    [methods, onCityChangeCustom, setValue]
  )

  const customCity = watch('customCity')
  const customDistrict = watch('customDistrict')
  const customAddress = watch('customAddress')
  const customEmail = watch('customEmail')
  const receiptType = watch('receiptType')
  const receiptCity = watch('receiptCity')
  const isAutoFillMemberInfo = watch('isAutoFillMemberInfo')
  const isAutoFillReceiptInfo = watch('isAutoFillReceiptInfo')
  const isNoReceipt = receiptType === RECEIPT_TYPE.NoReceipt.value

  const handleClearButtonClick = useCallback(() => {
    setValue('donateAmount', 0)
    setValue('donateItem', '')
    setValue('donateMethod', 1)

    setValue('customName', '')
    setValue('customIDNumber', '')
    setValue('customPhone', '')
    setValue('customEmail', '')
    setValue('customCity', '')
    setValue('customDistrict', '')
    setValue('customAddress', '')

    setValue('receiptType', '1')
    setValue('receiptTitle', '')
    setValue('receiptCity', '')
    setValue('receiptDistrict', '')
    setValue('receiptAddress', '')
    setValue('receiptEmail', '')

    setValue('receiptAgreeToTerms', false)
    setValue('receiptDisagreeToPublicName', false)
  }, [setValue])

  useEffect(() => {
    if (isAutoFillMemberInfo && user) {
      setValue('customName', user.name)
      setValue('customIDNumber', user.idNumber)
      setValue('customPhone', user.phone)
      setValue('customEmail', user.email)
      setValue('customCity', user.city)
      onCityChangeCustom(user.city)
      setValue('customDistrict', user.area)
      setValue('customAddress', user.address)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoFillMemberInfo, user])

  useEffect(() => {
    if (isAutoFillReceiptInfo) {
      setValue('receiptCity', customCity)
      onCityChangeReceipt(customCity)
      setValue('receiptDistrict', customDistrict)
      setValue('receiptAddress', customAddress)
      setValue('receiptEmail', customEmail)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoFillReceiptInfo])

  useEffect(() => {
    clearData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="py-6 lg:py-12 flex items-center justify-center min-h-screen bg-background">
      <div className="bg-white py-6 px-4 rounded-2xl lg:w-[1120px] w-full mx-auto">
        <div className="text-center pb-6">
          <h1 className="mobile-regular-number-1 lg:desktop-bold-number-3 bg-gradient-to-b from-[#FF4500] to-[#FFA500] text-transparent bg-clip-text">
            捐款表單
          </h1>
        </div>
        {/* 步驟條 */}
        <div className="flex items-center justify-center gap-x-2 sm:gap-x-3 pb-6 max-w-full mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-white bg-primary-500 mobile-bold-h3 lg:desktop-bold-h4">
              1
            </div>
            <span className="mt-2 text-primary-500 mobile-bold-h4 lg:desktop-bold-h6">步驟 1</span>
          </div>

          <div className="text-primary-500 pb-10 flex gap-x-1 sm:gap-x-3">
            <span className="text-sm sm:text-base font-bold">_</span>
            <span className="text-sm sm:text-base font-bold">__</span>
            <span className="text-sm sm:text-base font-bold">__</span>
            <span className="text-sm sm:text-base font-bold">_</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-dark-500 border border-dark-500 mobile-bold-h3 lg:desktop-regular-h4">
              2
            </div>
            <span className="mt-2 text-dark-500 desktop-regular-p lg:desktop-regular-h6">
              步驟 2
            </span>
          </div>

          <div className="text-primary-500 pb-10 flex gap-x-1 sm:gap-x-3">
            <span className="text-sm sm:text-base font-bold">_</span>
            <span className="text-sm sm:text-base font-bold">__</span>
            <span className="text-sm sm:text-base font-bold">__</span>
            <span className="text-sm sm:text-base font-bold">_</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-dark-500 border border-dark-500 mobile-bold-h3 lg:desktop-regular-h4">
              3
            </div>
            <span className="mt-2 text-dark-500 desktop-regular-p lg:desktop-regular-h6">
              步驟 3
            </span>
          </div>
        </div>

        {/* 表單 */}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitButtonClick)}>
          <div className="flex flex-col gap-y-6">
            <FieldTitle title="付款選項" />
            <label className="field-label">捐款金額</label>
            <div className="flex flex-col gap-y-3">
              <FormTitle musted title="新台幣：" />
              <div className="lg:max-w-[410px]">
                <RHFTextField name="donateAmount" type="number" placeholder="請輸入捐款金額" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <PaymentButton value={300} onClick={handlePaymentButtonClick} />
              <PaymentButton value={600} onClick={handlePaymentButtonClick} />
              <PaymentButton value={1000} onClick={handlePaymentButtonClick} />
              <PaymentButton value={2000} onClick={handlePaymentButtonClick} />
              <PaymentButton value={5000} onClick={handlePaymentButtonClick} />
            </div>
          </div>

          <div className="flex flex-col gap-y-3 mt-6">
            <FormTitle musted title="捐款項目 :" />
            <div className="lg:max-w-[410px]">
              <RHFSelect name="donateItem">
                {donateItemOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <h5 className="desktop-regular-h5 text-dark-900">選擇付款方式</h5>
            <div className="flex flex-row gap-y-2">
              <label className="field-label">線上付款：</label>
              {Object.values(ONLINE_PAYMENT_METHODS)
                .filter((item) => item.value === 3)
                .map((item) => (
                  <RHFRadioButton
                    disabled={false}
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    name="donateMethod"
                    label={item.label}
                    defaultChecked
                  />
                ))}
            </div>
          </div>
          <div className="space-y-9 mt-9">
            <FieldTitle title="捐款人資訊" />
            <div className="space-y-4">
              <div className="flex flex-row items-center gap-x-2">
                <RHFCheckbox
                  name="isAutoFillMemberInfo"
                  id="isAutoFillMemberInfo"
                  disabled={!user}
                />
                <label className="desktop-regular-h6 text-dark-600" htmlFor="isAutoFillMemberInfo">
                  自動帶入會員資料
                </label>
              </div>

              <div className="flex flex-col gap-y-2">
                <FormTitle htmlFor="customName" musted title="捐款人姓名 / 公司名稱" />
                <RHFTextField
                  name="customName"
                  type="text"
                  id="customName"
                  placeholder="限 13 個字"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <FormTitle htmlFor="customIDNumber" musted title="證件號碼 / 統一編號" />
                <RHFTextField
                  name="customIDNumber"
                  id="customIDNumber"
                  type="text"
                  placeholder="請輸入證件號碼或是統一編號"
                />
                <p className="desktop-regular-p text-dark-500">
                  （請輸入證件號碼或統一編號，若為身份證字號，可提供財政部作為年度綜合所得稅申報使用）
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                <FormTitle htmlFor="customPhone" musted title="聯絡電話" />
                <RHFTextField
                  name="customPhone"
                  type="tel"
                  id="customPhone"
                  placeholder="請輸入您的連絡電話"
                />
                <p className="desktop-regular-p text-dark-500">（例：0212345678 或 0912345678）</p>
              </div>

              <div className="flex flex-col gap-y-2">
                <FormTitle htmlFor="customEmail" musted title="E-mail" />
                <RHFTextField
                  name="customEmail"
                  type="email"
                  id="customEmail"
                  placeholder="請輸入您的 E-mail"
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <FormTitle musted title="通訊地址" />

                <div className="space-y-2 flex flex-row items-center gap-x-3 lg:space-y-0 lg:gap-x-3">
                  {/* City */}
                  <div className="lg:inline-block lg:w-full lg:max-w-[250px] flex-grow w-full">
                    <div className="lg:block">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        displayEmpty
                        fullWidth
                        value={customCity}
                        onChange={handleCustomCityChange}
                        sx={{
                          height: '44px',
                          '&.Mui-focused': {
                            '.MuiOutlinedInput-notchedOutline': {
                              borderWidth: '1px',
                              borderColor: '#ADB5BD',
                            },
                          },
                        }}
                        inputProps={{
                          sx: {
                            padding: '12px 16px',
                          },
                        }}
                        error={!!errors.customCity}
                      >
                        {customCountryOptions.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    {errors.customCity && (
                      <FormHelperText sx={{ marginX: '14px' }} error>
                        {errors.customCity.message}
                      </FormHelperText>
                    )}
                  </div>

                  {/* District */}
                  <div className="lg:inline-block lg:w-full lg:max-w-[250px] flex-grow w-full pb-2 lg:pb-0">
                    <RHFSelect
                      name="customDistrict"
                      sx={{
                        height: '44px',
                        '& .MuiSelect-select': {
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px 16px',
                        },
                      }}
                    >
                      {customAreaOptions.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </div>
                </div>

                {/* Address */}
                <RHFTextField name="customAddress" type="text" placeholder="請輸入地址" />
              </div>
            </div>
          </div>

          <div className="space-y-9 mt-9">
            <FieldTitle title="收據寄送" />

            <div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-row items-center gap-x-2">
                  <RHFCheckbox name="isAutoFillReceiptInfo" id="isAutoFillReceiptInfo" />
                  <label
                    className="desktop-regular-h6 text-dark-600"
                    htmlFor="isAutoFillReceiptInfo"
                  >
                    同捐款人
                  </label>
                </div>
                <div className="flex gap-x-4 lg:flex-row lg:gap-x-4">
                  {initialReceiptTypeOptions.map((item) => {
                    const receiptTypeItem = Object.values(RECEIPT_TYPE).find(
                      (receiptTypeItem) => receiptTypeItem.value === item.value
                    )

                    if (!receiptTypeItem || !receiptTypeItem.enabled) return null

                    return (
                      <RHFRadioButton
                        key={receiptTypeItem.id}
                        id={receiptTypeItem.id}
                        name="receiptType"
                        value={item.value}
                        label={item.label}
                      />
                    )
                  })}
                </div>
              </div>
            </div>

            {!isNoReceipt && (
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <FormTitle htmlFor="receiptTitle" musted title="收據抬頭" />
                  <RHFTextField
                    name="receiptTitle"
                    id="receiptTitle"
                    placeholder="請輸入收據抬頭"
                  />
                </div>

                <div className="flex flex-col gap-y-3">
                  <FormTitle musted title="通訊地址" />

                  <div className="space-y-2 flex flex-row items-center gap-x-3 lg:space-y-0 lg:gap-x-3">
                    {/* City */}
                    <div className="lg:inline-block lg:w-full lg:max-w-[250px] flex-grow w-full">
                      <div className="lg:block">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          displayEmpty
                          fullWidth
                          value={receiptCity}
                          onChange={handleReceiptCityChange}
                          sx={{
                            height: '44px',
                            '&.Mui-focused': {
                              '.MuiOutlinedInput-notchedOutline': {
                                borderWidth: '1px',
                                borderColor: '#ADB5BD',
                              },
                            },
                          }}
                          inputProps={{
                            sx: {
                              padding: '12px 16px',
                            },
                          }}
                          error={!!errors.receiptCity}
                        >
                          {receiptCountryOptions.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      {errors.receiptCity && (
                        <FormHelperText sx={{ marginX: '14px' }} error>
                          {errors.receiptCity.message}
                        </FormHelperText>
                      )}
                    </div>

                    {/* District */}
                    <div className="lg:inline-block lg:w-full lg:max-w-[250px] flex-grow w-full pb-2 lg:pb-0">
                      <RHFSelect
                        name="receiptDistrict"
                        sx={{
                          height: '44px',
                          '& .MuiSelect-select': {
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 16px',
                          },
                        }}
                      >
                        {receiptAreaOptions.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </div>
                  </div>

                  {/* Address */}
                  <RHFTextField name="receiptAddress" type="text" placeholder="請輸入地址" />
                </div>

                <div className="flex flex-col gap-y-2">
                  <FormTitle htmlFor="receiptEmail" musted title="電子信箱" />
                  <RHFTextField name="receiptEmail" id="receiptEmail" placeholder="請輸入 E-mail" />
                </div>
              </div>
            )}

            {isNoReceipt && <Divider />}

            <div className="space-y-9">
              <div>
                <div className="flex items-start gap-x-2">
                  <div className="mt-1">
                    <RHFCheckbox name="receiptAgreeToTerms" id="receiptAgreeToTerms" />
                  </div>
                  <label className="field-label" htmlFor="receiptAgreeToTerms">
                    我同意，本捐款表單內之個人基本資料用於開立寄送捐款收據、活動通知及會務聯絡之目的。
                  </label>
                </div>
                {errors.receiptAgreeToTerms && (
                  <FormHelperText sx={{ marginX: '26px' }} error>
                    {errors.receiptAgreeToTerms.message}
                  </FormHelperText>
                )}
              </div>

              <div className="flex items-start gap-x-2">
                <div className="mt-1">
                  <RHFCheckbox
                    name="receiptDisagreeToPublicName"
                    id="receiptDisagreeToPublicName"
                  />
                </div>
                <label className="field-label space-y-3" htmlFor="receiptDisagreeToPublicName">
                  <p>
                    我不同意將全名公開於捐款芳名錄。
                    <br />
                    ※本會依財團法人法第25條規定，應公開捐款人姓名及金額，如您不同意公開請勾選上述選項。
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 items-stretch lg:flex-row-reverse lg:gap-x-6 lg:justify-center pt-6 lg:pt-16">
            <button type="submit" className="btn-solid btn-hover lg:min-w-[192px]">
              下一步，確認匯款資料
            </button>
            <button
              type="button"
              className="btn-outline btn-hover lg:min-w-[192px]"
              onClick={handleClearButtonClick}
            >
              清除重填
            </button>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default DonateView
