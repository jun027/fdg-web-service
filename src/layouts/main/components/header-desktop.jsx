import Image from 'next/image'
import UserStatus from './user-status'
import { CONFIG } from '@/config-global'
import Link from 'next/link'
import { PATHS } from '@/routes/page'
import HeaderMenuDesktop from './header-menu-desktop'

function HeaderDesktop() {
  return (
    <nav className="hidden lg:block bg-secondary-600 px-10 py-3 lg:py-0">
      <div className="max-w-[1120px] mx-auto flex justify-between items-center h-[94px]">
        <div className="flex gap-x-12 items-stretch h-full">
          <Link href={PATHS.Home.path} className="flex gap-x-[10px] items-center" target="_self">
            <Image
              src={'/images/icons/app-icon-01.png'}
              alt="logo"
              width={128}
              height={128}
              className="aspect-square w-[70px]"
            />

            <p className="desktop-regular-h5 text-white">{CONFIG.appName}</p>
          </Link>

          <HeaderMenuDesktop />
        </div>

        <UserStatus />
      </div>
    </nav>
  )
}

export default HeaderDesktop
