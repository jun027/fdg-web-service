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
import schema from './formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { RHFCheckbox } from '@/components/hook-form/rhf-checkbox'
import { useRouter } from '@/routes/hooks/use-router'
import useReplenishFormContext from '@/store/use-replenish-form-context'
import { PATHS } from '@/routes/page'
import PaymentButton from '@/sections/service/components/payment-button'

function ReplenishView({
  countryOptions: initialCountryOptions = [],
  receiptTypeOptions: initialReceiptTypeOptions = [],
  areaMap: initialAreaMap = {},
}) {
  const router = useRouter()
  const storeFormData = useReplenishFormContext((state) => state.storeFormData)
  const clearData = useReplenishFormContext((state) => state.clearData)

  const initialTimeSlotOptions = [
    { value: 'early', label: '00:00~00:59 (早子)' },
    { value: 'chou', label: '01:00~02:59 (丑)' },
    { value: 'yin', label: '03:00~04:59 (寅)' },
    { value: 'mao', label: '05:00~06:59 (卯)' },
    { value: 'chen', label: '07:00~08:59 (辰)' },
    { value: 'si', label: '09:00~10:59 (巳)' },
    { value: 'wu', label: '11:00~12:59 (午)' },
    { value: 'wei', label: '13:00~14:59 (未)' },
    { value: 'shen', label: '15:00~16:59 (申)' },
    { value: 'you', label: '17:00~18:59 (酉)' },
    { value: 'xu', label: '19:00~20:59 (戌)' },
    { value: 'hai', label: '21:00~22:59 (亥)' },
    { value: 'late', label: '23:00~23:59 (晚子)' },
  ]

  const { options: donateTimeSlotOptions } = useOptions(initialTimeSlotOptions, {
    value: '',
    label: '請選擇出生時辰',
  })

  const defaultValues = {
    donateAmount: 0,
    donateQuantity: 1,
    donateMethod: 3,
    donateName: '',
    gender: '',
    year: '',
    month: '',
    day: '',
    donateTimeSlot: '',

    contactName: '',
    contactGender: '',
    contactPhone: '',
    contactEmail: '',
    contactPostalCode: '',
    contactCity: '',
    contactDistrict: '',
    contactAddress: '',

    receiptType: '1',
    receiptTitle: '',
    receiptCity: '',
    receiptDistrict: '',
    receiptAddress: '',
    receiptEmail: '',
  }

  const {
    countryOptions: contactCountryOptions,
    areaOptions: contactAreaOptions,
    onCityChange: onCityChangeContact,
  } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  const {
    countryOptions: receiptCountryOptions,
    areaOptions: receiptAreaOptions,
    onCityChange: onCityChangeReceipt,
  } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

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
          activity_name: '元月九號補財庫',
          name: data.donateName,
          gender: data.gender,
          birth: `${data.year}-${data.month}-${data.day}`,
          chinese_hour: data.donateTimeSlot,
        },
        payform: {
          name: data.contactName,
          phone: data.contactPhone,
          email: data.contactEmail,
          city: data.contactCity,
          area: data.contactDistrict, 
          address: data.contactAddress, 
          receipt_type: Number(data.receiptType), 
          receipt_extra: {
            receipt_title: data.receiptTitle, 
            receipt_city: data.receiptCity, 
            receipt_area: data.receiptDistrict, 
            receipt_address: data.receiptAddress, 
            receipt_email: data.receiptEmail, 
          },
          pay_type: Number(data.donateMethod) || 1,
          pay_extra: {
            bank_5last: data.bank_5last || '',
          },
        },
      }

      storeFormData(payload) 

      router.push(PATHS.Service.Replenish.child.Payment.path)
    },
    [router, storeFormData]
  )

  const handleContactCityChange = useCallback(
    (e) => {
      onCityChangeContact(e.target.value)
      setValue('contactCity', e.target.value)
      setValue('contactDistrict', '')
      methods.trigger('contactCity')
    },
    [methods, onCityChangeContact, setValue]
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

  const contactCity = watch('contactCity')
  const contactDistrict = watch('contactDistrict')
  const contactAddress = watch('contactAddress')
  const contactEmail = watch('contactEmail')
  const receiptType = watch('receiptType')
  const receiptCity = watch('receiptCity')
  const isAutoFillReceiptInfo = watch('isAutoFillReceiptInfo')
  const isNoReceipt = receiptType === RECEIPT_TYPE.NoReceipt.value

  const years = Array.from({ length: 2024 - 1920 + 1 }, (_, i) => 1920 + i).reverse()
  const months = Array.from({ length: 12 }, (_, i) => i + 1) // 1 to 12
  const days = Array.from({ length: 31 }, (_, i) => i + 1) // 1 to 31

  const handlePaymentButtonClick = useCallback(
    (e) => {
      const value = e.currentTarget.getAttribute('data-value')
      methods.setValue('donateAmount', Number(value), { shouldValidate: true })
      methods.trigger('donateAmount')
    },
    [methods]
  )
 

  const handleClearButtonClick = useCallback(() => {
    setValue('donateAmount', 0)
    setValue('donateQuantity', 1)
    setValue('donateName', '')
    setValue('year', '')
    setValue('month', '')
    setValue('day', '')
    setValue('donateTimeSlot', '')

    setValue('contactName', '')
    setValue('contactPhone', '')
    setValue('contactEmail', '')
    setValue('contactPostalCode', '')
    setValue('contactCity', '')
    setValue('contactDistrict', '')
    setValue('contactAddress', '')

    setValue('receiptType', '1')
    setValue('receiptTitle', '')
    setValue('receiptCity', '')
    setValue('receiptDistrict', '')
    setValue('receiptAddress', '')
    setValue('receiptEmail', '')
  }, [setValue])

  useEffect(() => {
    if (isAutoFillReceiptInfo) {
      setValue('receiptCity', contactCity)
      onCityChangeReceipt(contactCity)
      setValue('receiptDistrict', contactDistrict)
      setValue('receiptAddress', contactAddress)
      setValue('receiptEmail', contactEmail)
    } else {
      setValue('receiptEmail', '')
      setValue('receiptAddress', '')
      setValue('receiptCity', '')
      setValue('receiptDistrict', '')
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
            補財庫
          </h1>
        </div>
        {/* 步驟條 */}
        <div className="flex items-center justify-center gap-x-1 sm:gap-x-3 pb-6 max-w-full mx-auto whitespace-nowrap">
          <div className="flex flex-col items-center">
            <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-white bg-primary-500 desktop-regular-h6 lg:desktop-bold-h4">
              1
            </div>
            <span className="mt-2 text-primary-500 mobile-medium-h4 lg:desktop-bold-h6">
              填寫資料
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
              2
            </div>
            <span className="mt-2 text-dark-500 desktop-regular-p lg:desktop-regular-h6">
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

        {/* 表單 */}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitButtonClick)}>
         <FieldTitle title="元月九號補財庫" />
         <div className="mt-3 desktop-regular-h6 text-dark-900">
           <p>活動日期：即日起至 ~ 2025/02/06</p>
         </div>

         <div className="flex flex-col gap-y-2 mt-3">
           <FormTitle musted title="新台幣：" />
           <div className="relative lg:max-w-[332px]">
             <RHFTextField name="donateAmount" type="number" placeholder="請輸入補財庫金額" />
           </div>
           <div className="flex flex-wrap gap-4 mt-6">
             <PaymentButton value={300} onClick={handlePaymentButtonClick} />
             <PaymentButton value={600} onClick={handlePaymentButtonClick} />
             <PaymentButton value={1200} onClick={handlePaymentButtonClick} />
             <PaymentButton value={3600} onClick={handlePaymentButtonClick} />
             <PaymentButton value={6000} onClick={handlePaymentButtonClick} />
           </div>
         </div>

          <div className="space-y-3 mt-10">
            <FieldTitle title="信眾資料" />
            <div className="flex items-center">
              {/* Name Field */}
              <div className="flex flex-col gap-y-2 lg:min-w-[332px]">
                <FormTitle htmlFor="donateName" musted title="姓名：" />
                <RHFTextField
                  name="donateName"
                  type="text"
                  id="donateName"
                  placeholder="請輸入您的姓名"
                />
              </div>

              {/* Gender Selection */}
              <div className="flex items-center gap-x-2 whitespace-nowrap mt-8">
                <FormTitle musted title="性別：" className="whitespace-nowrap" />
                <div className="flex gap-x-2">
                  <RHFRadioButton id="M" name="gender" value="M" label="男" />
                  <RHFRadioButton id="F" name="gender" value="F" label="女" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-3">
            <FormTitle musted title="農曆生日：" />
            <div className="flex flex-wrap gap-x-2 lg:flex-nowrap lg:w-[332px]">
              {/* 年份 */}
              <div className="flex-1 lg:w-[105px] bg-white">
                <RHFSelect name="year">
                  <MenuItem value="">年份</MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>

              {/* 月份 */}
              <div className="flex-1 lg:w-[105px] bg-white">
                <RHFSelect name="month">
                  <MenuItem value="">月份</MenuItem>
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>

              {/* 日期 */}
              <div className="flex-1 lg:w-[105px] bg-white">
                <RHFSelect name="day">
                  <MenuItem value="">日期</MenuItem>
                  {days.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 lg:gap-y-2 mt-3">
            <FormTitle musted title="時辰 :" />
            <div className="lg:w-[332px] bg-white">
              <RHFSelect name="donateTimeSlot">
                {donateTimeSlotOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </div>
          </div>
          <hr className="border-t border-gray-300 my-6" />

          <FieldTitle title="聯絡人資料" />

          {/* Name */}
          <div className="flex items-center mt-6">
            {/* Name Field */}
            <div className="flex flex-col gap-y-2 lg:min-w-[383px]">
              <FormTitle htmlFor="contactName" musted title="姓名：" />
              <RHFTextField
                name="contactName"
                type="text"
                id="contactName"
                placeholder="請輸入您的姓名"
              />
            </div>

            {/* Gender Selection */}
            <div className="flex items-center gap-x-2 whitespace-nowrap mt-8 pl-4">
              <FormTitle musted title="性別：" className="whitespace-nowrap" />
              <div className="flex gap-x-2">
                <RHFRadioButton
                  id="contactMale"
                  name="contactGender"
                  value="contactMale"
                  label="男"
                />
                <RHFRadioButton
                  id="contactFemale"
                  name="contactGender"
                  value="contactFemale"
                  label="女"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <FormTitle htmlFor="contactPhone" musted title="手機：" />
            <div className="lg:max-w-[547px]">
              <RHFTextField
                name="contactPhone"
                type="tel"
                id="contactPhone"
                placeholder="請輸入您的連絡電話"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2  mt-6">
            <FormTitle htmlFor="contactEmail" musted title="電子信箱：" />
            <div className="lg:max-w-[547px]">
              <RHFTextField
                name="contactEmail"
                type="email"
                id="contactEmail"
                placeholder="請輸入您的電子信箱"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6 lg:max-w-[547px]">
            <FormTitle musted title="地址 :" />

            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
              {/* 郵遞區號 */}
              <div className="flex-1 lg:min-w-[98px] bg-white">
                <RHFTextField
                  name="contactPostalCode"
                  type="PostalCode"
                  id="contactPostalCode"
                  placeholder="請輸入郵遞區號"
                />
              </div>

              {/* 縣市選擇 */}
              <div className="flex-1 lg:min-w-[98px] bg-white">
                <div className="lg:block">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    displayEmpty
                    fullWidth
                    value={contactCity}
                    onChange={handleContactCityChange}
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
                        padding: '12px 16px',
                      },
                    }}
                    error={!!errors.contactCity}
                  >
                    {contactCountryOptions.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                {errors.contactCity && (
                  <FormHelperText sx={{ marginX: '14px' }} error>
                    {errors.contactCity.message}
                  </FormHelperText>
                )}
              </div>

              {/* 區域選擇 */}
              <div className="flex-1 lg:min-w-[98px] bg-white">
                <RHFSelect name="contactDistrict">
                  {contactAreaOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
            </div>

            {/* 地址輸入框 */}
            <RHFTextField name="contactAddress" type="text" placeholder="請輸入地址" />
          </div>

          <div className="space-y-3 mt-6">
            <FieldTitle title="收據寄送" />
            <div>
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-row items-center gap-x-2">
                  <RHFCheckbox name="isAutoFillReceiptInfo" id="isAutoFillReceiptInfo" />
                  <label
                    className="desktop-regular-h6 text-dark-600"
                    htmlFor="isAutoFillReceiptInfo"
                  >
                    同聯絡人
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
              <div className="flex flex-col space-y-4 ">
                <div className="flex flex-col gap-y-2">
                  <FormTitle htmlFor="receiptTitle" musted title="收據抬頭" />
                  <RHFTextField
                    name="receiptTitle"
                    id="receiptTitle"
                    placeholder="請輸入收據抬頭"
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <FormTitle musted title="通訊地址" />

                  <div className="flex flex-row items-center gap-x-3 lg:space-y-0 lg:gap-x-3">
                    {/* City */}
                    <div className="lg:inline-block lg:w-full lg:max-w-[250px] flex-grow w-full">
                      <div className="lg:block">
                        <Select
                          name="receiptCity"
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
                    <div className="lg:inline-block lg:w-full lg:max-w-[250px] flex-grow w-full ">
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
          </div>
          <hr className="border-t border-gray-300 mt-6" />

          <div className="flex flex-col gap-y-2 mt-6">
            <FieldTitle title="付款方式" />
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

          <div className="flex flex-col gap-y-6 items-stretch lg:flex-row-reverse lg:gap-x-6 lg:justify-center py-[64px] lg:pt-16">
            <button
              type="submit"
              className="bg-primary-500 w-full lg:w-auto min-w-[192px] py-4 rounded text-white text-nowrap text-center desktop-regular-h6 btn-hover"
            >
              下一步，支付
            </button>
            <button
              type="button"
              className="bg-white w-full lg:w-auto min-w-[192px] py-4 border border-primary-500 text-primary-500 rounded text-nowrap text-center btn-hover"
              onClick={handleClearButtonClick}
            >
              清除重填
            </button>
          </div>

          <FieldTitle title="補財庫的意義與用意" />
          <div className="py-3 text-dark-900 desktop-regular-h6">
            <p>
              財庫，象徵著我們在世間所能承接、積累財富的能力與容量。簡單來說，財是流量，庫則是存量。若有財而無庫，財富進來卻無法累積，最終如水過篩，所剩無幾。因此，補財庫的目的，就是為了擴大我們的財庫容量，穩固財富根基，讓財富能夠源源不絕地流入並得以長久保存。
              <br />
              「補財庫」是一種傳統禮俗，透過敬呈補財庫金與文疏，祈求消災解厄、植福進財。這個法門的核心在於先解厄消災，再補財運，如同清理土地才能耕種，去除障礙才能迎來順遂。
            </p>
          </div>

          <FieldTitle title="為何需要補財庫？" />
          <div className="py-3 text-dark-900 desktop-regular-h6">
            <p>
              在人生旅途上，我們的財富運勢可能會因業障束縛或災厄纏身而受阻。就像種子被污垢包覆，無論如何澆灌，都難以發芽茁壯。因此，補財庫的重點不僅是祈求財富，更在於清除阻礙財運的業障與災厄，從而增強個人或家庭的財富磁場。
            </p>
            <p>補財庫的過程通常包括：</p>
            <ul className="list-disc  pl-7">
              <li>
                敬呈金紙與自身疏文：供奉子天官武財神、三官大帝等神靈，祈求祛罪消災、解除植福。
              </li>
              <li>請天官赦福補財：完成消災解厄後，方能有效地擴充財庫，累積財富。</li>
            </ul>
            <p>在補財庫的儀式中，需準備具特定規格的「補財庫金」，包括：</p>
            <ul className="list-disc  pl-7">
              <li>天金、尺金：象徵敬奉天界神靈的財帛。</li>
              <li>天官錢、天庫錢：用以請天官賜福補財。</li>
              <li>虎錢：祈求祈解災厄。</li>
              <li>補運錢、財寶神衣：象徵財富與運勢的補足。</li>
            </ul>
            <p>這些供品結合祈請文疏（如「消災植福文疏」），逐步完成消災解厄、補庫增財的程序。</p>
          </div>

          <FieldTitle title="補財庫的時機" />
          <div className="py-3 text-dark-900 desktop-regular-h6">
            <p>補財庫宜選擇特定的節慶或神明聖誕進行：</p>
            <ul className="list-disc  pl-7">
              <li>正月十五：祈求天官賜福。</li>
              <li>三月十五：祈求武財神賜財。</li>
              <li>地官與水官聖誕：祈求地官解因，水官化果。</li>
            </ul>
            <p>
              這些節日有助於放大補財庫的效應，讓祈求的結果更加順遂圓滿。
              <br />
              補財庫的意義總結
            </p>
            <p>補財庫的真正用意在於：</p>
            <ul className="list-disc  pl-7">
              <li>消除財運上的業障與災厄。</li>
              <li>擴大財庫容量，穩定財富根基。</li>
              <li>祈求財富持久穩定，讓生活更為豐足圓滿。</li>
            </ul>
            <p>
              透過補財庫，除了為自身祈求財運昌盛，也是在精神層面上一種清淨與積德的表現。誠心祈求，心存善念，自然能夠迎來財運與福氣的長久加持。
            </p>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default ReplenishView
