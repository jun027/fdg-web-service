'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { PATHS } from '@/routes/page'
import BreadcrumbsView from './breadcrumbs-view'

function formatRouteForBreadcrumbs(initArray, dataArray) {
  dataArray.forEach((item) => {
    if (!item.child) {
      initArray.push({
        title: item.title,
        subTitle: item.subTitle,
        path: item.path,
        list: item.list,
      })
    } else {
      formatRouteForBreadcrumbs(initArray, Object.values(item.child))
    }
  })
}

function BreadcrumbsContainer() {
  const url = usePathname()
  const allRouteDataList = []
  formatRouteForBreadcrumbs(allRouteDataList, Object.values(PATHS))

  const data = allRouteDataList.find((item) => item.path === url)

  return (
    <>
      <div className="hidden lg:block">
        {data && (
          <BreadcrumbsView separator="/">
            {data.list.map((item, index) => {
              const isLast = index === data.list.length - 1
              const color = isLast ? 'text-primary-800' : 'text-dark-600'

              return (
                <li key={item.title}>
                  {item.path ? (
                    <Link
                      href={item.path}
                      target="_self"
                      className={clsx('flex items-center gap-x-1 desktop-regular-h6', color)}
                    >
                      {item.icon && <item.icon />}
                      {item.title}
                    </Link>
                  ) : (
                    <p className={clsx('desktop-regular-h6', color)}>{item.title}</p>
                  )}
                </li>
              )
            })}
          </BreadcrumbsView>
        )}
      </div>
    </>
  )
}

export default BreadcrumbsContainer
