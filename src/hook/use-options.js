import { useMemo } from 'react'

export function useOptions(initOptions = [], defaultOptionItem = { value: '', label: '請選擇' }) {
  const options = useMemo(
    () => [defaultOptionItem, ...initOptions],
    [defaultOptionItem, initOptions]
  )

  return { options }
}
