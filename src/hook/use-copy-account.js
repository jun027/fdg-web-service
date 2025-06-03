import { DONATE_ACCOUNT } from '@/constants/common'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

export const useCopyAccount = () => {
  const handleCopyButtonClick = useCallback(() => {
    navigator.clipboard.writeText(DONATE_ACCOUNT)
    toast.success('已複製')
  }, [])

  return { handleCopyButtonClick }
}
