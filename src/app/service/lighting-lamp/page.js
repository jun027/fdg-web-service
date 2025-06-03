import {
  getCountryTownAction,
  getLightingTypeAction,
  getPayTypeAction,
  getReceiptTypeAction,
} from '@/actions/getCountryTown'
import { LightingLampView } from '@/sections/service/lighting-lamp'

export default async function LightingLampPage() {
  let countryTownData = await getCountryTownAction()
  let itemTypeData = await getLightingTypeAction()
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
    <LightingLampView
      donateItemOptions={donateItemOptions}
      countryOptions={countryOptions}
      receiptTypeOptions={receiptTypeOptions}
      payTypeData={payTypeData}
      areaMap={areaMap}
    />
  )
}
