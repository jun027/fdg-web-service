'use client'

import { memo, useCallback } from 'react'
import { ACCOUNT_NAV_LIST } from '@/constants/account-nav-list'
import SelectProView from '@/components/selectPro/select-pro-view'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { palette } from '@/style/config'
function AccountSidebarMobile() {
  const pathname = usePathname()
  const router = useRouter()

  const menuOption = ACCOUNT_NAV_LIST.flatMap((item) => [
    {
      title: item.title,
      link: item.link,
      enable: item.enable,
    },
    ...(item.child || []),
  ])
    .filter((item) => item.enable)
    .map((item) => ({
      title: item.title,
      value: item.link,
    }))

  const onSelectChange = useCallback(
    (e) => {
      if (e.target.value !== pathname) {
        router.push(e.target.value)
      }
    },
    [pathname, router]
  )

  return (
    <SelectProView
      value={pathname}
      onChange={onSelectChange}
      options={menuOption}
      sx={{
        backgroundColor: '#975409',
        color: palette.common.white,
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent !important',
        },
        '&.Mui-focused': {
          '.MuiOutlinedInput-notchedOutline': {
            borderWidth: '0px',
            borderColor: 'transparent',
          },
        },
        '& .MuiSvgIcon-root': {
          color: `${palette.common.white} !important`,
        },
      }}
    />
  )
}

export default memo(AccountSidebarMobile)
