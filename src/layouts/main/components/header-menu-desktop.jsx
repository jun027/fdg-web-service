'use client'

import { useState } from 'react'
import { MENU_LIST_DESKTOP } from '@/constants/menu-list-config'
import { StyledPopover } from './custom-popover'
import { useRouter } from '@/routes/hooks'

function HeaderMenuDesktop() {
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
      setPopoverList(data.child)
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

  return (
    <div>
      <ul className="flex flex-row gap-x-8 h-full">
        {MENU_LIST_DESKTOP.map((cur) => {
          if (!cur.enable) {
            return null
          }

          return (
            <li
              key={cur.title}
              className="flex justify-center items-center w-full h-full min-w-[86px] text-white desktop-regular-h6 px-2 c-header-button"
              onMouseEnter={(e) => handlePopoverOpen(cur, e)}
              onMouseLeave={handlePopoverClose}
              onClick={() => handleRouter(cur)}
            >
              {cur.title}
            </li>
          )
        })}
      </ul>
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
    </div>
  )
}

export default HeaderMenuDesktop
