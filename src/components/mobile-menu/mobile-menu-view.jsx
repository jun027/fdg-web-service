'use client'

import React, { memo, useCallback } from 'react'
import useMobileMenuContext from '@/store/use-mobile-menu-context'
import { Drawer, List, ListItemButton } from '@mui/material'
import { MOBILE_HEADER_NAV_LINKS } from '@/constants/mobile-header-nav-link'
import { useRouter } from '@/routes/hooks'
import { useAuthContext } from '@/auth/hooks'
import { useBoolean } from '@/hook/use-boolean'
import { FaFacebook } from 'react-icons/fa'
import LoginMenuView from './login-menu-view'
import UnLoginMenuView from './un-login-menu-view'
import Link from 'next/link'
import { IoClose } from 'react-icons/io5'
import styledListItemButton from './style/list-item-button.style'
import { PATHS } from '@/routes/page'
import { CONFIG } from '@/config-global'

function MobileMenuView() {
  const router = useRouter()

  const {
    value: isLogoutLoading,
    onTrue: logoutLoadingOnTrue,
    onFalse: logoutLoadingOnFalse,
  } = useBoolean(false)

  const { user, handleLogout } = useAuthContext()

  const open = useMobileMenuContext((state) => state.open)

  const setOpen = useMobileMenuContext((state) => state.setOpen)

  const handleDrawerToggle = useCallback(
    (newOpen) => () => {
      setOpen(newOpen)
    },
    [setOpen]
  )

  const handleCollapseClick = useCallback(
    (e) => {
      const link = e.currentTarget.getAttribute('data-link')

      router.push(link)

      setOpen(false)
    },
    [router, setOpen]
  )

  const handleChildLinkClick = useCallback(
    (e) => {
      const link = e.currentTarget.getAttribute('data-link')

      setOpen(false)
      router.push(link)
    },
    [router, setOpen]
  )

  const handleLogoutClick = useCallback(async () => {
    if (isLogoutLoading) return

    logoutLoadingOnTrue()

    try {
      await handleLogout()

      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      logoutLoadingOnFalse()
    }
  }, [handleLogout, isLogoutLoading, logoutLoadingOnFalse, logoutLoadingOnTrue, router, setOpen])

  const handleProfileClick = useCallback(() => {
    router.push(PATHS.User.child.Profile.path)
    setOpen(false)
  }, [router, setOpen])

  const renderCloseButton = (
    <button
      className="absolute top-0 right-4 z-10 rounded-4 duration-200 hover:bg-primary-800/10"
      onClick={handleDrawerToggle(false)}
    >
      <IoClose color="#000" size={36} />
    </button>
  )

  const renderDrawerList = (
    <List component="nav" aria-labelledby="nested-list-subheader" style={{ paddingBottom: '60px' }}>
      {/* 主選單 */}
      {MOBILE_HEADER_NAV_LINKS.map((link) => {
        if (!link.enabled) return null

        return (
          <React.Fragment key={link.title}>
            <ListItemButton
              data-link={link.link}
              onClick={handleCollapseClick}
              sx={styledListItemButton}
            >
              <p className="w-full mobile-regular-h3 text-secondary-600 text-center">
                {link.title}
              </p>
            </ListItemButton>
          </React.Fragment>
        )
      })}

      {/* 登入後選單 */}
      {user && (
        <LoginMenuView
          isLogoutLoading={isLogoutLoading}
          onLogoutClick={handleLogoutClick}
          onProfileClick={handleProfileClick}
        />
      )}

      {/* 未登入選單 */}
      {!user && <UnLoginMenuView onClick={handleChildLinkClick} />}
    </List>
  )

  const renderMediaLinks = (
    <div
      style={{
        backgroundColor: '#FAF5ED',
        position: 'fixed',
        width: '100%',
        bottom: '0',
        left: '0',
        height: '60px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '2.25rem',
      }}
    >
      <Link href={CONFIG.socialMedia.facebookUrl} target="_blank">
        <FaFacebook size={25} />
      </Link>
    </div>
  )

  return (
    <Drawer
      open={open}
      onClose={handleDrawerToggle(false)}
      PaperProps={{
        sx: {
          paddingTop: '1rem',
          background: '#FAF5ED',
          width: '100%',
        },
      }}
    >
      <div
        style={{
          position: 'relative',
          paddingTop: '3rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          height: '100%',
        }}
      >
        {renderCloseButton}
        {renderDrawerList}
        {renderMediaLinks}
      </div>
    </Drawer>
  )
}

export default memo(MobileMenuView)
