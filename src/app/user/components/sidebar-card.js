'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'
import { FaChevronRight } from 'react-icons/fa'

function SidebarCard({ title = '', link = '', childLinkList = [] }) {
  const path = usePathname()
  const isActive = path.includes(link)

  return (
    <>
      {/* 沒有 child option */}
      {childLinkList.length === 0 && (
        <Link
          className={clsx(
            'flex justify-between items-center py-2 px-6 w-full border-b-2 border-sidebar-card-border duration-200 hover:bg-primary-700 group',
            isActive ? 'bg-primary-700' : 'bg-transparent'
          )}
          href={link}
          target="_self"
        >
          <p
            className={clsx(
              'group-hover:text-white duration-200 desktop-regular-h6',
              isActive ? 'text-white' : 'text-primary-800'
            )}
          >
            {title}
          </p>
          <FaChevronRight
            size={18}
            className={clsx(
              'group-hover:text-white duration-200',
              isActive ? 'text-white' : 'text-primary-800'
            )}
          />
        </Link>
      )}

      {/* 有 child option */}
      {childLinkList.length > 0 && (
        <div
          className={clsx(
            'w-full py-6 rounded-lg border-b-2 border-sidebar-card-border hover:bg-primary-600 duration-200 group',
            isActive ? 'bg-primary-600' : 'bg-white'
          )}
        >
          <div className="px-6 py-2 flex justify-between items-center">
            <p
              className={clsx(
                'group-hover:text-white text-primary-600 duration-200 desktop-regular-h5',
                isActive ? 'text-white' : 'text-primary-600'
              )}
            >
              {title}
            </p>
            <FaChevronRight
              size={18}
              className={clsx(
                'group-hover:text-white duration-200 text-primary-600',
                isActive ? 'text-white' : 'text-primary-600'
              )}
            />
          </div>
          <div className="space-y-1">
            {childLinkList.map((item) => {
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  target="_self"
                  className={clsx(
                    'flex flex-row gap-x-3 px-6 py-2 group hover:bg-[#458606] duration-200',
                    item.link === path ? 'bg-[#458606]' : 'bg-transparent'
                  )}
                >
                  <p
                    className={clsx(
                      'text-primary-600 desktop-light-h6 group-hover:text-white duration-200',
                      item.link.includes(path) || isActive ? 'text-white' : 'text-primary-600'
                    )}
                  >
                    －
                  </p>
                  <p
                    className={clsx(
                      'text-primary-600 desktop-light-h6 group-hover:text-white duration-200',
                      item.link.includes(path) || isActive ? 'text-white' : 'text-primary-600'
                    )}
                  >
                    {item.title}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default memo(SidebarCard)
