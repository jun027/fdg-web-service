import {
  getCountryTownAction,
  getGuangmingTypeAction,
  getPayTypeAction,
  getReceiptTypeAction,
} from '@/actions/getCountryTown'
import { GuangmingView } from '@/sections/service/guangming'

export default async function GuangmingPage() {
  let countryTownData = await getCountryTownAction()
  let itemTypeData = await getGuangmingTypeAction()
  let receiptTypeData = await getReceiptTypeAction()
  let payTypeData = await getPayTypeAction()



  const countryOptions = countryTownData.country_list.map((country) => ({
    label: country.country_name,
    value: country.country_code,
  }))
  const areaMap = countryTownData.town_list

  const donateItemOptions = itemTypeData.map((item) => ({
    label: `${item.name} - ${item.value}`,
    value: item.type,
  }))

  const receiptTypeOptions = receiptTypeData.map((item) => ({
    label: item.name,
    value: `${item.type}`,
  }))

  return (
    <GuangmingView
      donateItemOptions={donateItemOptions}
      countryOptions={countryOptions}
      receiptTypeOptions={receiptTypeOptions}
      payTypeData={payTypeData}
      areaMap={areaMap}
    />
  )
}
