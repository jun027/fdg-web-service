import {
  getCountryTownAction,
  getPayTypeAction,
  getReceiptTypeAction,
} from '@/actions/getCountryTown'
import { ReplenishView } from '@/sections/service/replenish'

export default async function ReplenishPage() {
  let countryTownData = await getCountryTownAction()
  let receiptTypeData = await getReceiptTypeAction()
  let payTypeData = await getPayTypeAction()

  const countryOptions = countryTownData.country_list.map((country) => ({
    label: country.country_name,
    value: country.country_code,
  }))
  const areaMap = countryTownData.town_list

  const receiptTypeOptions = receiptTypeData.map((item) => ({
    label: item.name,
    value: `${item.type}`,
  }))

  return (
    <ReplenishView
      countryOptions={countryOptions}
      receiptTypeOptions={receiptTypeOptions}
      payTypeData={payTypeData}
      areaMap={areaMap}
    />
  )
}
