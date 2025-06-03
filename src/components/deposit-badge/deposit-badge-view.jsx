'use client'

import { memo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PATHS } from '@/routes/page'
import { IoIosArrowUp } from 'react-icons/io'
import { BiSolidDonateHeart } from 'react-icons/bi'
import { CONFIG } from '@/config-global'

function DepositBadgeView() {
  const scrollToTop = useCallback(() => {
    if (window.scrollTo) {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    }
  }, [])

  const handleScrollToTopButtonClick = useCallback(() => {
    scrollToTop()
  }, [scrollToTop])

  return (
    <div className="select-none fixed bottom-0 right-0 z-0">
      <div className="z-depositBadge absolute bottom-10 right-4 lg:right-7 lg:bottom-[200px] flex flex-col justify-center items-center gap-y-3">
        <button
          className="flex flex-col items-center btn-hover"
          onClick={handleScrollToTopButtonClick}
        >
          <IoIosArrowUp className="text-primary-500 w-5 lg:w-7" />
          <p className="mobile-bold-h4 lg:desktop-bold-h6 text-primary-500 lg:-mt-1">TOP</p>
        </button>
        <Link
          href={PATHS.Service.child.Donate.path}
          rel="noopener"
          className="w-12 lg:w-[60px] aspect-square border-white rounded-full border-4 bg-primary-500 text-white flex items-center justify-center desktop-light-p btn-hover text-nowrap"
        >
          <p className="hidden lg:inline-block">我要捐款</p>
          <BiSolidDonateHeart size={24} className="lg:hidden" />
        </Link>
        <Link
          href={CONFIG.socialMedia.facebookUrl}
          target="_blank"
          rel="noopener"
          className="w-12 lg:w-[60px] aspect-square btn-hover"
        >
          <Image
            className="aspect-square w-full"
            src="/images/buttons/btn-fb-02.png"
            alt="line"
            width={161}
            height={161}
          />
        </Link>
      </div>
    </div>
  )
}

export default memo(DepositBadgeView)
