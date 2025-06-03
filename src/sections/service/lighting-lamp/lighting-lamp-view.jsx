'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import FormProvider from '@/components/hook-form/form-provider'
import FieldTitle from '@/components/hook-form/field-title'
import FormTitle from '@/components/hook-form/form-title'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { RHFSelect } from '@/components/hook-form/rhf-select'
import { Divider, FormHelperText, MenuItem, Select } from '@mui/material'
import { useOptions } from '@/hook/use-options'
import { RHFCheckbox } from '@/components/hook-form/rhf-checkbox'
import { RHFRadioButton } from '@/components/hook-form/rhf-radio-button'
import { useCountryTown } from '@/hook/use-country-town'
import useLightingLampFormContext from '@/store/use-lighting-lamp-form-context'
import { zodResolver } from '@hookform/resolvers/zod'
import schema from './formSchema'
import { RECEIPT_TYPE, ONLINE_PAYMENT_METHODS } from '@/sections/service/constants'
import { v4 as uuidv4 } from 'uuid'
import PaymentView from '../payment/payment-view'
function LightingLampView({
  donateItemOptions: initialDonateItemOptions = [],
  countryOptions: initialCountryOptions = [],
  areaMap: initialAreaMap = {},
  receiptTypeOptions: initialReceiptTypeOptions = [],
}) {
  const storeFormData = useLightingLampFormContext((state) => state.storeFormData)
  const clearData = useLightingLampFormContext((state) => state.clearData)
  const context = useLightingLampFormContext()
  const [checkoutDataList, setCheckoutDataList] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  // 表單預設值
  const defaultValues = {
    donateItem: '',
    donateName: '',
    gender: 'M',
    year: '',
    month: '',
    day: '',
    donateTimeSlot: '',
    donatePostalCode: '',
    donateCity: '',
    donateDistrict: '',
    donateAddress: '',
    contactName: '',
    contactGender: '',
    contactPhone: '',
    contactEmail: '',
    contactPostalCode: '',
    contactCity: '',
    contactDistrict: '',
    contactAddress: '',
    donateMethod: 3,
    receiptType: '1',
    receiptTitle: '',
    receiptPostalCode: '',
    receiptCity: '',
    receiptDistrict: '',
    receiptAddress: '',
    receiptEmail: '',
    receiptAgreeToTerms: false,
    receiptDisagreeToPublicName: false,
  }

  /* 選單 */
  //捐款
  const {
    countryOptions: donateCountryOptions,
    areaOptions: donateAreaOptions,
    onCityChange: onCityChangeDonate,
  } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  //聯絡人
  const {
    countryOptions: contactCountryOptions,
    areaOptions: contactAreaOptions,
    onCityChange: onCityChangeContact,
  } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  //收據
  const {
    countryOptions: receiptCountryOptions,
    areaOptions: receiptAreaOptions,
    onCityChange: onCityChangeReceipt,
  } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  /* 選單 */
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

  const onSubmitButtonClick = useCallback(async () => {
    const isValid = await methods.trigger([
      'contactName',
      'contactGender',
      'contactPhone',
      'contactEmail',
      'contactPostalCode',
      'contactCity',
      'contactDistrict',
      'contactAddress',
      'receiptType',
      'receiptTitle',
      'receiptCity',
      'receiptDistrict',
      'receiptAddress',
      'receiptEmail',
      'receiptAgreeToTerms',
    ])

    if (isValid) {
      const formData = methods.getValues()
      const payload = {
        service_list: checkoutDataList.map((item) => ({
          item_id: item.donateItem,
          name: item.donateName,
          gender: item.gender,
          birth: `${item.year}-${String(item.month).padStart(2, '0')}-${String(item.day).padStart(
            2,
            '0'
          )}`,
          chinese_hour: item.donateTimeSlot,
          city: item.donateCity,
          area: item.donateDistrict,
          address: item.donateAddress,
        })),
        payform: {
          name: formData.contactName,
          phone: formData.contactPhone,
          email: formData.contactEmail,
          city: formData.contactCity,
          area: formData.contactDistrict,
          address: formData.contactAddress,
          receipt_type: Number(formData.receiptType),
          receipt_extra: {
            receipt_title: formData.receiptTitle,
            receipt_city: formData.receiptCity,
            receipt_area: formData.receiptDistrict,
            receipt_address: formData.receiptAddress,
            receipt_email: formData.receiptEmail,
          },
          pay_type: formData.donateMethod,
          pay_extra: {
            bank_5last: formData.bank_5last,
          },
        },
      }
      // 暫存表單資料
      storeFormData(payload)
      // 顯示付款視窗
      setIsPaymentPopupOpen(true)
    } else {
      console.log('右側表單驗證失敗')
    }
  }, [methods, storeFormData, checkoutDataList])

  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false)

  const handleDonateSubmit = async () => {
    //驗證點燈人
    const valid = await methods.trigger([
      'donateItem',
      'donateName',
      'gender',
      'year',
      'month',
      'day',
      'donateTimeSlot',
      'donatePostalCode',
      'donateCity',
      'donateDistrict',
      'donateAddress',
    ])

    if (valid) {
      const data = methods.getValues()
      handleSaveData(data)
    } else {
      console.log('點燈資料驗證失敗')
    }
  }

  const { options: donateItemOptions } = useOptions(initialDonateItemOptions, {
    value: '',
    label: '請選擇安太歲金額',
  })

  const { options: donateTimeSlotOptions } = useOptions(initialTimeSlotOptions, {
    value: '',
    label: '請選擇出生時辰',
  })

  const handleSaveData = (data) => {
    if (!data) {
      console.error('資料未成功提交')
      return
    }

    const selectedGender = data.gender === 'M' ? '男' : data.gender === 'F' ? '女' : ''
    const selectedDonateTimeSlot = initialTimeSlotOptions.find(
      (option) => option.value === data.donateTimeSlot
    )?.label
    const selectedDonateItem = initialDonateItemOptions.find(
      (option) => option.value === data.donateItem
    )

    const newData = {
      ...data,
      id: uuidv4(),
      gender: selectedGender,
      donateTimeSlot: selectedDonateTimeSlot,
      donateValue: selectedDonateItem?.label || '',
    }
    setCheckoutDataList((prevList) => {
      const updatedList = [...prevList, newData]
      return updatedList
    })

    methods.reset(defaultValues)
  }

  const handleDelete = (id) => {
    setCheckoutDataList((prevList) => prevList.filter((item) => item.id !== id))
  }

  const contactPostalCode = watch('contactPostalCode')
  const donateCity = watch('donateCity')
  const contactDistrict = watch('contactDistrict')
  const contactAddress = watch('contactAddress')
  const contactEmail = watch('contactEmail')
  const contactCity = watch('contactCity')
  const receiptType = watch('receiptType')
  const receiptCity = watch('receiptCity')
  const isAutoFillReceiptInfo = watch('isAutoFillReceiptInfo')
  const isNoReceipt = receiptType === RECEIPT_TYPE.NoReceipt.value

  const handleDonateCityChange = useCallback(
    (e) => {
      onCityChangeDonate(e.target.value)
      setValue('donateCity', e.target.value)
      setValue('donateDistrict', '')
      methods.trigger('donateCity')
    },
    [onCityChangeDonate, setValue]
  )

  const handleContactCityChange = useCallback(
    (e) => {
      onCityChangeContact(e.target.value)
      setValue('contactCity', e.target.value)
      setValue('contactDistrict', '')
      methods.trigger('contactCity')
    },
    [onCityChangeContact, setValue]
  )

  const handleReceiptCityChange = useCallback(
    (e) => {
      onCityChangeReceipt(e.target.value)
      setValue('receiptCity', e.target.value)
      setValue('receiptDistrict', '')
      methods.trigger('receiptCity')
    },
    [onCityChangeReceipt, setValue]
  )

  const desktopFloatRef1 = useRef(null)
  const desktopFloatRef2 = useRef(null)
  const mobileFloatRef1 = useRef(null)
  const mobileFloatRef2 = useRef(null)

  const years = Array.from({ length: 2024 - 1920 + 1 }, (_, i) => 1920 + i).reverse()
  const months = Array.from({ length: 12 }, (_, i) => i + 1) // 1 to 12
  const days = Array.from({ length: 31 }, (_, i) => i + 1) // 1 to 31

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
  }, [
    contactAddress,
    contactCity,
    contactDistrict,
    contactEmail,
    contactPostalCode,
    isAutoFillReceiptInfo,
    watch('contactEmail'),
    watch('contactPostalCode'),
    watch('contactAddress'),
    watch('contactCity'),
    watch('contactDistrict'),
  ])

  useEffect(() => {
    let direction1 = 1 // 控制第一張圖的上下方向
    let direction2 = 1 // 控制第二張圖的上下方向
    let position1 = 0 // 第一張圖的初始位置
    let position2 = 0 // 第二張圖的初始位置

    const interval = setInterval(() => {
      position1 += direction1
      if (position1 >= 20 || position1 <= 0) direction1 *= -1
      if (desktopFloatRef1.current) {
        desktopFloatRef1.current.style.transform = `translateY(${position1}px)`
      }
      if (mobileFloatRef1.current) {
        mobileFloatRef1.current.style.transform = `translateY(${position1}px)`
      }

      position2 += direction2
      if (position2 >= 20 || position2 <= 0) direction2 *= -1
      if (desktopFloatRef2.current) {
        desktopFloatRef2.current.style.transform = `translateY(${position2}px)`
      }
      if (mobileFloatRef2.current) {
        mobileFloatRef2.current.style.transform = `translateY(${position2}px)`
      }
    }, 70)

    return () => clearInterval(interval)
  }, [])

  // 計算總金額
  useEffect(() => {
    const calculatedAmount = checkoutDataList.reduce((sum, item) => {
      const value = parseFloat(item.donateValue?.replace(/[^\d]/g, '') || '0')
      return sum + value
    }, 0)
    setTotalAmount(calculatedAmount)
  }, [checkoutDataList])

  useEffect(() => {
    clearData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmitButtonClick)}>
      <div className="bg-[#FAF5ED] p-4 relative overflow-hidden lg:h-[650px] lg:py-14 lg:px-40 container mx-auto max-w-[1440px]">
        <div className="relative z-10 block lg:hidden ">
          <h1 className="mobile-bold-h1 text-primary-700 text-center">安太歲</h1>
          <p className="py-4 text-dark-900 mobile-regular-h4 ">
            「安太歲」是一項源自傳統道教的平安祈福儀式，旨在化解因生肖與當年「太歲星君」相沖而帶來的潛在不利影響。每年都有不同生肖的人與當年的太歲相合或相沖，這些生肖屬於**「犯太歲」**，可能會在生活中遇到一些挑戰或困難，例如健康、事業、感情上的阻礙。因此，透過「安太歲」來求得太歲星君的庇佑，以達到化解不順並保護平安的目的。
          </p>
          <ul className="ml-8 text-dark-700 mobile-regular-h4 list-disc">
            <li>犯太歲的生肖</li>
            <li>工作或生活變動較大者</li>
            <li>健康</li>
            <li>平安與順利</li>
          </ul>
        </div>
        <div className="hidden lg:block lg:items-start ">
          <div className="relative py-16 text-left">
            <h1 className="lg:desktop-bold-h1 text-primary-700">安太歲</h1>
            <p className="mt-6  text-dark-900 lg:desktop-regular-h5  max-w-[549px]">
              「安太歲」是一項源自傳統道教的平安祈福儀式，旨在化解因生肖與當年「太歲星君」相沖而帶來的潛在不利影響。每年都有不同生肖的人與當年的太歲相合或相沖，這些生肖屬於**「犯太歲」**，可能會在生活中遇到一些挑戰或困難，例如健康、事業、感情上的阻礙。因此，透過「安太歲」來求得太歲星君的庇佑，以達到化解不順並保護平安的目的。
            </p>
            <ul className="mt-3 text-dark-700 lg:desktop-regular-h6 list-disc list-inside flex flex-row space-x-3 ">
              <li>犯太歲的生肖</li>
              <li>工作或生活變動較大者</li>
              <li>健康</li>
              <li>平安與順利</li>
            </ul>
          </div>
        </div>
        <div className="relative inset-0 z-0 pointer-events-none ">
          <div className="absolute -top-[275px] w-[167px] -left-10 z-0 lg:left-10 lg:-top-[420px] lg:w-[334px]">
            <Image
              src="/images/bg-light-01.png"
              alt="bg"
              width={334}
              height={151}
              className="aspect-[334/151] w-full "
            />
          </div>
          <div className="absolute -top-14 -right-24 scale-y-[-1] lg:w-[334px] lg:-top-10 lg:right-8">
            <Image
              src="/images/bg-light-01.png"
              alt="bg"
              width={334}
              height={151}
              className="aspect-[334/151] w-full"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10 gap-4 lg:hidden">
          <div ref={mobileFloatRef1} className="rounded-lg w-[161px] overflow-hidden">
            <Image
              src="/images/light-01.png"
              alt="土地婆"
              width={323}
              height={323}
              className="rounded-lg object-cover"
            />
          </div>
          <div ref={mobileFloatRef2} className="rounded-lg ] w-[161px] overflow-hidden">
            <Image
              src="/images/light-02.png"
              alt="土地公"
              width={323}
              height={323}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="lg:w-1/2 lg:relative hidden lg:block ">
          <div
            ref={desktopFloatRef1}
            className="absolute w-[323px] rounded-lg overflow-hidden shadow-lg -right-[330px] -top-[430px] z-10"
          >
            <Image
              src="/images/light-01.png"
              alt="土地婆 lg"
              width={323}
              height={323}
              className="object-cover aspect-[323/323] w-full"
            />
          </div>

          <div
            ref={desktopFloatRef2}
            className="absolute w-[323px] rounded-lg overflow-hidden shadow-lg -top-44 -right-[560px] z-0"
          >
            <Image
              src="/images/light-02.png"
              alt="土地公 lg"
              width={323}
              height={323}
              className="object-cover aspect-[323/323] w-full"
            />
          </div>

          <div className="absolute -top-[480px] -right-[720px] ">
            <Image
              src="/images/bg-light-02.png"
              alt="觔斗雲"
              width={361}
              height={157}
              className="w-[361px]"
            />
          </div>

          <div className="absolute -bottom-44 -left-40 ">
            <Image
              src="/images/bg-light-03.png"
              alt="翻轉的觔斗雲"
              width={361}
              height={157}
              className="w-[361px]"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#FAF5ED] p-4 relative overflow-hidden lg:flex lg:mt-0 container mx-auto max-w-[1440px]">
        <div className="flex flex-col lg:space-y-6 lg:py-14 lg:px-40 lg:w-1/2 space-y-6">
          <FieldTitle title="安太歲資料" />

          {/* Donation Item */}
          <div className="flex flex-col gap-y-2 lg:gap-y-2">
            <FormTitle musted title="安太歲金額 :" />
            <div className="lg:w-[332px]">
              <RHFSelect
                name="donateItem"
                sx={{
                  height: '44px',
                  '.MuiOutlinedInput-root': {
                    height: '44px',
                  },
                  '.MuiSelect-select': {
                    padding: '0 16px',
                    lineHeight: '44px',
                  },
                }}
              >
                {donateItemOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-2 gap-y-3">
            {/* Name Field */}
            <div className="flex flex-col gap-y-2 lg:gap-y-2 lg:flex-1 ">
              <FormTitle musted title="姓名：" />
              <div className="lg:w-[332px]">
                <RHFTextField
                  name="donateName"
                  type="text"
                  id="donateName"
                  placeholder="請輸入您的名字"
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div className="flex lg:gap-x-2 gap-x-2 lg:flex-row lg:flex-none lg:mt-8 items-center">
              <div className="flex items-center gap-x-2">
                <FormTitle musted title="性別：" className="whitespace-nowrap" />
              </div>
              <div className="flex gap-x-4">
                <RHFRadioButton id="radio-button-male" name="gender" value="M" label="男" />
                <RHFRadioButton id="radio-button-female" name="gender" value="F" label="女" />
              </div>
            </div>
          </div>

          {/* Birthday Selection */}
          <div className="flex flex-col gap-y-3 lg:gap-y-2">
            <FormTitle musted title="國曆生日：" />
            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
              {/* 年份 */}
              <div className="flex-1 lg:max-w-[105px]">
                <RHFSelect
                  name="year"
                  sx={{
                    height: '44px',
                    '.MuiOutlinedInput-root': {
                      height: '44px',
                    },
                    '.MuiSelect-select': {
                      padding: '0 16px',
                      lineHeight: '44px',
                    },
                  }}
                >
                  <MenuItem value="">年份</MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>

              {/* 月份 */}
              <div className="flex-1 lg:max-w-[105px]">
                <RHFSelect
                  name="month"
                  sx={{
                    height: '44px',
                    '.MuiOutlinedInput-root': {
                      height: '44px',
                    },
                    '.MuiSelect-select': {
                      padding: '0 16px',
                      lineHeight: '44px',
                    },
                  }}
                >
                  <MenuItem value="">月份</MenuItem>
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>

              {/* 日期 */}
              <div className="flex-1 lg:max-w-[105px]">
                <RHFSelect
                  name="day"
                  sx={{
                    height: '44px',
                    '.MuiOutlinedInput-root': {
                      height: '44px',
                    },
                    '.MuiSelect-select': {
                      padding: '0 16px',
                      lineHeight: '44px',
                    },
                  }}
                >
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

          <div className="flex flex-col gap-y-3 lg:gap-y-2">
            <FormTitle musted title="時辰 :" />
            <div className="lg:w-[332px]">
              <RHFSelect
                name="donateTimeSlot"
                sx={{
                  height: '44px',
                  '.MuiOutlinedInput-root': {
                    height: '44px',
                  },
                  '.MuiSelect-select': {
                    padding: '0 16px',
                    lineHeight: '44px',
                  },
                }}
              >
                {donateTimeSlotOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 ">
            <FormTitle musted title="地址 :" />

            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
              {/* 郵遞區號 */}
              <div className="flex-1 lg:min-w-[177px]">
                <RHFTextField
                  name="donatePostalCode"
                  type="text"
                  id="donatePostalCode"
                  placeholder="請輸入郵遞區號"
                />
              </div>

              {/* 縣市選擇 */}
              <div className="flex-1 lg:min-w-[177px] ">
                <div className="lg:block">
                  <Select
                    name="donateCity"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    displayEmpty
                    fullWidth
                    value={donateCity}
                    onChange={handleDonateCityChange}
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
                        background: '#fff',
                        padding: '10.5px 16px',
                      },
                    }}
                    error={!!errors.donateCity}
                  >
                    {donateCountryOptions.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                {errors.donateCity && (
                  <FormHelperText sx={{ marginX: '14px' }} error>
                    {errors.donateCity.message}
                  </FormHelperText>
                )}
              </div>

              {/* 區域選擇 */}
              <div className="flex-1 lg:min-w-[177px]">
                <RHFSelect
                  name="donateDistrict"
                  sx={{
                    height: '44px',
                    '.MuiOutlinedInput-root': {
                      height: '44px',
                    },
                    '.MuiSelect-select': {
                      padding: '0 16px',
                      lineHeight: '44px',
                    },
                  }}
                >
                  {donateAreaOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
            </div>

            {/* 地址輸入框 */}
            <div className="flex-1 lg:min-w-[547px]">
              <RHFTextField name="donateAddress" type="text" placeholder="請輸入地址" />
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <div className="bg-[#FAF5ED]">
              <button
                type="button"
                onClick={handleDonateSubmit}
                className="lg:mt-0 px-6 py-2 bg-primary-500 text-[#212529] desktop-regular-p rounded transition duration-300 ease-in-out transform hover:bg-yellow-300"
              >
                新增
              </button>
            </div>

            <div className="hidden lg:block w-full">
              <div className="min-w-[550px] mx-auto">
                <hr className="w-full border-t border-gray-300 my-6" />

                <div className="space-y-4 ">
                  <FieldTitle title="注意事項" />

                  <div className="text-dark-900 lg:desktop-regular-p space-y-2">
                    <ol className="list-decimal pl-4">
                      <li>完成申請作業後，系統即提供一組訂單編號，供信眾查詢用。</li>
                      <li>訂單填寫交易完成後，以電子郵件寄送確認單給予信眾。</li>
                      <li>顧方將於收到銀行撥款入帳後 7 天內完成安奉作業。</li>
                      <li>
                        使用信用卡付款將於付款後 7
                        個工作天寄送電子收據；以超商代收、虛擬帳號則會於繳費後 14
                        個工作天寄發電子收據。(為了節省資源恕不寄紙本收據，如需紙本收據請自行列印)
                      </li>
                      <li>
                        使用信用卡付款時，請勿重新整理網頁，以免重複扣款；如出現扣款失敗訊息，請改用其他信用卡或稍後再試。
                      </li>
                      <li>
                        如使用信用卡完成點燈付款或捐款手續後，如欲取消或申請退款者，請於訂單成立後 7
                        天內提出申請；但使用其它支付工具(如超商、WebATM、虛擬帳號)，恕無法取消及申請退款。
                      </li>
                      <li>
                        如不需要加入會員，可將加入會員勾選取消，即可使用一次性點燈申請。如操作上有任何疑問，請於上班時間聯繫。服務電話
                        (03)863-1158 或留言。
                      </li>
                      <li>
                        玉山銀行(808)1223-7754-2234-5205
                        ps.轉帳完成後請告知轉帳帳號末五碼、匯款金額和是否需開立收據，以利工作人員對帳。
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:py-14 lg:px-[116px] py-6">
          <div className="border border-dark-600 p-4 rounded-lg space-y-6 bg-white lg:w-[452px] lg:space-y-6">
            <FieldTitle title="聯絡人資料" />

            {/* Name */}
            <div className="flex flex-col lg:flex-row lg:min-w-[420px]">
              {/* Name Field */}
              <div className="flex flex-col  gap-y-2 lg:gap-y-2 lg:flex-1 lg:min-w-[256px]">
                <FormTitle htmlFor="contactName" musted title="姓名：" />
                <RHFTextField
                  name="contactName"
                  type="text"
                  id="contactName"
                  placeholder="請輸入您的姓名"
                />
              </div>

              {/* Gender Selection */}
              <div className="flex items-center lg:mt-5 mt-4">
                <FormTitle musted title="性別：" className="whitespace-nowrap " />
                <div className="flex gap-x-3 lg:gap-x-0">
                  <div className="flex gap-x-4">
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
            </div>

            <div className="flex flex-col gap-y-2 lg:gap-y-2">
              <FormTitle htmlFor="contactPhone" musted title="手機：" />
              <RHFTextField
                name="contactPhone"
                type="tel"
                id="contactPhone"
                placeholder="請輸入您的連絡電話"
              />
            </div>

            <div className="flex flex-col gap-y-2 lg:gap-y-2">
              <FormTitle htmlFor="contactEmail" musted title="電子信箱：" />
              <RHFTextField
                name="contactEmail"
                type="email"
                id="contactEmail"
                placeholder="請輸入您的電子信箱"
              />
            </div>

            <div className="flex flex-col gap-y-2 lg:gap-y-2">
              <FormTitle musted title="地址 :" />

              <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                {/* 郵遞區號 */}
                <div className="flex-1 lg:min-w-[98px] bg-white">
                  <RHFTextField
                    name="contactPostalCode"
                    type="PostalCode"
                    id="contactEmail"
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
                          padding: '10.5px 16px',
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
                  <RHFSelect
                    name="contactDistrict"
                    sx={{
                      height: '44px',
                      '.MuiOutlinedInput-root': {
                        height: '44px',
                      },
                      '.MuiSelect-select': {
                        padding: '0 16px',
                        lineHeight: '44px',
                      },
                    }}
                  >
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
            <hr className="border-t border-gray-300" />

            <div className="">
              <FieldTitle title="選擇付款方式" />

              <div className="flex items-center gap-y-2">
                <label className="desktop-regular-h6 text-dark-900 mt-4">線上付款：</label>
                <div className="flex gap-x-4 gap-y-2 mt-4">
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
            </div>
            <hr className="border-t border-gray-300 my-6" />

            <div className="">
              <FieldTitle title="收據寄送" />

              <div className="flex flex-col gap-y-3 py-9">
                <div className="flex flex-row items-center gap-x-2 ">
                  <RHFCheckbox name="isAutoFillReceiptInfo" id="isAutoFillReceiptInfo" />
                  <label
                    className="desktop-regular-h6 text-dark-600"
                    htmlFor="isAutoFillReceiptInfo"
                  >
                    同捐款人
                  </label>
                </div>
                <div className="flex flex-col gap-y-3 lg:flex-row lg:gap-x-4">
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

              {!isNoReceipt && (
                <div>
                  <div className="flex flex-col gap-y-2 lg:gap-y-2">
                    <FormTitle htmlFor="receiptTitle" musted title="收據抬頭" />
                    <RHFTextField
                      name="receiptTitle"
                      id="receiptTitle"
                      placeholder="請輸入收據抬頭"
                    />
                  </div>

                  <div className="flex flex-col gap-y-2 pt-4 lg:gap-y-2 lg:pt-4">
                    <FormTitle musted title="地址 :" />

                    <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                      {/* 縣市選擇 */}
                      <div className="flex-1 lg:min-w-[98px] bg-white">
                        <div className="lg:block">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            displayEmpty
                            fullWidth
                            value={receiptCity}
                            onChange={handleReceiptCityChange}
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
                                padding: '10.5px 16px',
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

                      {/* 區域選擇 */}
                      <div className="flex-1 lg:min-w-[98px] bg-white">
                        <RHFSelect
                          name="receiptDistrict"
                          sx={{
                            height: '44px',
                            '.MuiOutlinedInput-root': {
                              height: '44px',
                            },
                            '.MuiSelect-select': {
                              padding: '0 16px',
                              lineHeight: '44px',
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

                    {/* 地址輸入框 */}
                    <RHFTextField name="receiptAddress" type="text" placeholder="請輸入地址" />
                  </div>

                  <div className="flex flex-col gap-y-2  mt-4 lg:gap-y-2">
                    <FormTitle htmlFor="receiptEmail" musted title="電子信箱" />
                    <RHFTextField
                      name="receiptEmail"
                      id="receiptEmail"
                      placeholder="請輸入 E-mail"
                    />
                  </div>
                </div>
              )}

              {isNoReceipt && <Divider />}

              <div className="space-y-4">
                <div className="pt-9">
                  <div className="flex items-start gap-x-2 lg:pb-3">
                    <div className="mt-1">
                      <RHFCheckbox name="receiptAgreeToTerms" id="receiptAgreeToTerms" />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mobile-regular-h4 text-dark-900 lg:desktop-regular-h6"
                        htmlFor="receiptAgreeToTerms"
                      >
                        我同意，本捐款表單內之個人基本資料用於開立寄送捐款收據、活動通知及會務聯絡之目的。
                      </label>
                    </div>
                    {errors.receiptAgreeToTerms && (
                      <FormHelperText sx={{ marginX: '26px' }} error>
                        {errors.receiptAgreeToTerms.message}
                      </FormHelperText>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-x-2 lg:pb-6">
                  <div className="mt-1">
                    <RHFCheckbox
                      name="receiptDisagreeToPublicName"
                      id="receiptDisagreeToPublicName"
                    />
                  </div>
                  <label
                    className="mobile-regular-h4 text-dark-900 lg:desktop-regular-h6 space-y-3"
                    htmlFor="receiptDisagreeToPublicName"
                  >
                    <p>
                      我不同意將全名公開於捐款芳名錄。 <br />
                      ※本會依財團法人法第25條規定，應公開捐款人姓名及金額，如您不同意公開請勾選上述選項。
                    </p>
                  </label>
                </div>

                <div className="space-y-2 pt-6 lg:pt-0">
                  <FieldTitle title="結帳" />
                  {checkoutDataList.length > 0 ? (
                    checkoutDataList.map((checkoutData, index) => (
                      <div key={checkoutData.id} className="space-y-2 mt-4">
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            <span className="mr-2">項目：</span>
                            <span>安太歲</span>
                          </div>
                          <button
                            onClick={() => handleDelete(checkoutData.id)}
                            className="flex items-center text-gray-500 hover:text-gray-700"
                          >
                            <Image
                              src="/images/icons/TRASH.svg"
                              alt="trash"
                              width={14}
                              height={14}
                            />
                            刪除
                          </button>
                        </div>
                        <div className="flex">
                          <span className="mr-2">姓名：</span>
                          <span>{checkoutData.donateName}</span>
                        </div>
                        <div className="flex">
                          <span className="mr-2">性別：</span>
                          <span>{checkoutData.gender}</span>
                        </div>
                        <div className="flex">
                          <span className="mr-2">國曆生日：</span>
                          <span>
                            {checkoutData.year}-{checkoutData.month}-{checkoutData.day}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="mr-2">時辰：</span>
                          <span>{checkoutData.donateTimeSlot}</span>
                        </div>
                        <div className="flex">
                          <span className="mr-2">數量：</span>
                          <span>1</span>
                        </div>
                        <div className="flex">
                          <span className="mr-2">金額：</span>
                          <span>{checkoutData.donateValue}</span>
                        </div>
                        {index < checkoutDataList.length - 1 && (
                          <hr className="border-t border-gray-300 my-4" />
                        )}
                      </div>
                    ))
                  ) : (
                    <p>尚未新增資料</p>
                  )}
                  <hr className="border-t border-secondary-600 my-6" />
                  <div className="desktop-regular-h4 text-primary-800">
                    <span>合計：</span>
                    <span>${totalAmount}</span>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={onSubmitButtonClick}
                      className="lg:mt-4 mt-4 w-full px-6 py-3 bg-primary-500 desktop-regular-p rounded-lg  transition duration-300 ease-in-out transform hover:bg-yellow-300"
                    >
                      下一步，結帳
                    </button>
                    {isPaymentPopupOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <PaymentView
                          totalAmount={totalAmount}
                          onCancel={() => setIsPaymentPopupOpen(false)}
                          onConfirm={() => {
                            setIsPaymentPopupOpen(false)
                            console.log('付款成功！')
                          }}
                          serviceType="lighting-lamp"
                          context={context}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3 block lg:hidden pt-6">
            <FieldTitle title="注意事項" />
            <div className="text-dark-900 desktop-regular-p">
              <ol className="list-decimal ml-4">
                <li>完成申請作業後，系統即提供一組訂單編號，供信眾查詢用。</li>
                <li>訂單填寫交易完成後，以電子郵件寄送確認單給予信眾。</li>
                <li>顧方將於收到銀行撥款入帳後 7 天內完成安奉作業。</li>
                <li>
                  使用信用卡付款將於付款後 7 個工作天寄送電子收據；以超商代收、虛擬帳號則會於繳費後
                  14 個工作天寄發電子收據。(為了節省資源恕不寄紙本收據，如需紙本收據請自行列印)
                </li>
                <li>
                  使用信用卡付款時，請勿重新整理網頁，以免重複扣款；如出現扣款失敗訊息，請改用其他信用卡或稍後再試。
                </li>
                <li>
                  如使用信用卡完成點燈付款或捐款手續後，如欲取消或申請退款者，請於訂單成立後 7
                  天內提出申請；但使用其它支付工具(如超商、WebATM、虛擬帳號)，恕無法取消及申請退款。
                </li>
                <li>
                  如不需要加入會員，可將加入會員勾選取消，即可使用一次性點燈申請。如操作上有任何疑問，請於上班時間聯繫。服務電話
                  (03)863-1158 或留言。
                </li>
                <li>
                  玉山銀行(808)1223-7754-2234-5205
                  ps.轉帳完成後請告知轉帳帳號末五碼、匯款金額和是否需開立收據，以利工作人員對帳。
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default LightingLampView
