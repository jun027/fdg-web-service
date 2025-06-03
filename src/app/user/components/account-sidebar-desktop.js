'use client'

import { memo, useCallback } from 'react'

import { ACCOUNT_NAV_LIST } from '@/constants/account-nav-list'
import { useAuthContext } from '@/auth/hooks'
import { useRouter } from '@/routes/hooks'
import { useBoolean } from '@/hook/use-boolean'

import SidebarCard from './sidebar-card'

function AccountSidebarDesktop() {
  const router = useRouter()
  const { handleLogout } = useAuthContext()

  const {
    value: isLogoutLoading,
    onTrue: logoutLoadingOnTrue,
    onFalse: logoutLoadingOnFalse,
  } = useBoolean(false)

  const handleLogoutButtonClick = useCallback(async () => {
    logoutLoadingOnTrue()

    try {
      await handleLogout()

      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      logoutLoadingOnFalse()
    }
  }, [handleLogout, logoutLoadingOnFalse, logoutLoadingOnTrue, router])

  return (
    <div className="lg:w-[262px] lg:h-full">
      <div className="flex flex-col items-stretch gap-y-9 h-full">
        <div className="overflow-y-auto space-y-3">
          {ACCOUNT_NAV_LIST.filter((item) => item.enable).map((item) => (
            <SidebarCard
              key={item.link}
              title={item.title}
              link={item.link}
              childLinkList={item.child}
            />
          ))}
        </div>
        <button
          disabled={isLogoutLoading}
          className="max-w-[238px] mx-auto w-full py-2 px-4 border-white border-1 text-white rounded btn-hover desktop-regular-h6 bg-primary-800"
          onClick={handleLogoutButtonClick}
        >
          登出
        </button>
      </div>
    </div>
  )
}

export default memo(AccountSidebarDesktop)
