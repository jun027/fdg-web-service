'use client'

import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {
  return (
    <div className="relative lg:h-[60px] h-[66px] lg:max-w-[1440px] mx-auto py-3 px-4 lg:py-0 lg:px-0">
      <div className="absolute inset-0  lg:block">
        <Image
          src="/images/bg-banner-01.png"
          alt="背景圖片"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>

      <div className="absolute inset-0 block lg:hidden">
        <Image
          src="/images/bg-banner-02.png"
          alt="背景圖片"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full lg:text-center lg:gap-6 gap-3">
        <div className="text-secondary-600 mobile-regular-h5 lg:desktop-bold-h6 ">
          <p>「敬獻金紙祈福補財庫，向財神祈願幸福平安，增添財運福報！」</p>
        </div>

        <Link href="/service/replenish" passHref>
        <button className="bg-secondary-600 text-white mobile-regular-h5 lg:desktop-regular-p w-[93px] h-[42px] lg:w-[128px] lg:h-[44px] rounded-full hover:bg-brown-700">            點我查看
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Banner
