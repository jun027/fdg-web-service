import { getCountryTownAction } from '@/actions/getCountryTown'
import { ProfileView } from '@/sections/user'

export default async function ProfilePage() {
  let data = await getCountryTownAction()

  const countryOptions = data.country_list.map((country) => ({
    label: country.country_name,
    value: country.country_code,
  }))

  const areaMap = data.town_list

  return <ProfileView countryOptions={countryOptions} areaMap={areaMap} />
}
