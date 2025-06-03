'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { HiMenu } from 'react-icons/hi'
import { PATHS } from '@/routes/page'

import useMobileMenuContext from '@/store/use-mobile-menu-context'

function HeaderMobile() {
  const setOpen = useMobileMenuContext((state) => state.setOpen)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  return (
    <div className="lg:hidden bg-secondary-600 pl-6 px-4 py-4 flex justify-between items-center">
      <Link href={PATHS.Home.path} className="inline-block w-16">
        <Image
          src={'/images/icons/app-icon-01.png'}
          alt="app-icon"
          width={128}
          height={128}
          className="aspect-square w-full"
        />
      </Link>

      <h2 className="mobile-bold-h2 text-white">恆春郡福德宮</h2>

      <div className="w-16 flex justify-end items-center">
        <button className="p-1" onClick={onOpen}>
          <HiMenu className="text-white text-2xl" />
        </button>
      </div>
    </div>
  )
}

export default HeaderMobile
