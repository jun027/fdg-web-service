import { useCallback, useMemo, useState } from 'react'

const DEFAULT_AREA_OPTIONS = [{ value: '', label: '請選擇地區' }]

export function useCountryTown({ initialCountryOptions = [], initialAreaMap = {} }) {
  const countryOptions = useMemo(
    () => [{ label: '請選擇縣市', value: '' }, ...initialCountryOptions],
    [initialCountryOptions]
  )

  const [areaOptions, setAreaOptions] = useState(DEFAULT_AREA_OPTIONS)

  const onCityChange = useCallback(
    (city) => {
      if (city !== '') {
        setAreaOptions([
          ...DEFAULT_AREA_OPTIONS,
          ...initialAreaMap[city].map((area) => ({
            label: area.town_name,
            value: area.town_code,
          })),
        ])
      } else {
        setAreaOptions(DEFAULT_AREA_OPTIONS)
      }
    },
    [initialAreaMap]
  )

  return {
    countryOptions,
    areaOptions,
    setAreaOptions,
    onCityChange,
  }
}
