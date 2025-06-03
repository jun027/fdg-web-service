'use client'

import { useCallback, useState } from 'react'

import { TbLogout } from 'react-icons/tb'
import { StyledPopover } from './custom-popover'

import { useRouter } from '@/routes/hooks'
import { MENU_LIST_MOBILE } from '@/constants/menu-list-config'
import { useAuthContext } from '@/auth/hooks'
import { useBoolean } from '@/hook/use-boolean'
import { palette } from '@/style/config'

function LoginStatus() {
  const {
    value: isLogoutLoading,
    onTrue: logoutLoadingOnTrue,
    onFalse: logoutLoadingOnFalse,
  } = useBoolean(false)

  const { handleLogout } = useAuthContext()

  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)

  const [openedPopover, setOpenedPopover] = useState(false)

  const [popoverList, setPopoverList] = useState([])

  const popoverEnter = () => {
    setOpenedPopover(true)
  }

  const popoverLeave = () => {
    setOpenedPopover(false)
  }

  const handlePopoverOpen = (data, { currentTarget }) => {
    if (data.child && data.child.length > 0) {
      setPopoverList(data.child.filter((item) => item.enable))
      setAnchorEl(currentTarget)
      setOpenedPopover(true)
    }
  }

  const handleRouter = (data) => {
    setOpenedPopover(false)
    if (!data.child || data.child.length === 0) {
      router.push(data.path)
    }
  }

  const handlePopoverClose = () => {
    setOpenedPopover(false)
  }

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
    <>
      <div className="h-full flex flex-row items-center gap-x-5">
        <ul className="flex flex-row gap-x-8 h-full">
          {MENU_LIST_MOBILE.map((cur) => {
            return (
              <li
                key={cur.title}
                className="flex justify-center items-center gap-x-3 w-full h-full min-w-[86px] text-white desktop-regular-h6 px-2 c-header-button"
                onMouseEnter={(e) => handlePopoverOpen(cur, e)}
                onMouseLeave={handlePopoverClose}
                onClick={() => handleRouter(cur)}
              >
                {cur.icon && <cur.icon color={palette.common.white} size={22} />}
                {cur.title}
              </li>
            )
          })}
        </ul>
        <span className="inline-block w-[1px] bg-white h-6" />
        <button
          disabled={isLogoutLoading}
          type="button"
          className="h-full flex items-center text-white desktop-regular-h6 px-4 c-header-button gap-x-2"
          onClick={handleLogoutButtonClick}
        >
          <p>登出</p>
          <TbLogout size={20} />
        </button>
      </div>
      <StyledPopover
        id="mouse-over-popover"
        open={openedPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            onMouseEnter: popoverEnter,
            onMouseLeave: popoverLeave,
          },
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {popoverList.map((data) => {
          return (
            <button
              key={data.title}
              aria-hidden
              className="relative desktop-regular-h5 py-[14px] flex flex-row justify-center items-center gap-x-3 group hover:bg-secondary-500 duration-100 border-b-1 border-secondary-100"
              onClick={() => handleRouter(data)}
            >
              {/* <span className="inline-block aspect-square w-2 rounded-full bg-dark-700 opacity-0 group-hover:opacity-100 duration-100" /> */}
              <p className="text-secondary-600 desktop-regular-h6 duration-100 group-hover:text-white">
                {data.title}
              </p>
            </button>
          )
        })}
      </StyledPopover>
    </>
  )
}

export default LoginStatus
