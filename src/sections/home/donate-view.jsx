import { CONFIG } from '@/config-global'
import { PATHS } from '@/routes/page'
import { FaArrowRight } from 'react-icons/fa6'
import Image from 'next/image'
import Link from 'next/link'

function DonateView() {
  return (
    <div id="donate" className="bg-background px-4 pt-12 pb-8 lg:px-20 lg:py-12">
      <div className="max-w-650 mx-auto space-y-8 lg:flex lg:flex-row lg:items-center lg:space-y-0 lg:max-w-[1280px] lg:gap-x-20">
        <div className="space-y-7 lg:flex-1 lg:space-y-12">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-dark-600 desktop-regular-p">{CONFIG.appName}</p>
              <h2 className="text-primary-700 mobile-bold-h1 lg:desktop-bold-h2">
                土地公祝您財源滾滾!!
              </h2>
            </div>
            <p className="mobile-regular-h4 text-dark-600 lg:desktop-regular-h6 lg:max-w-[435px]">
              「捐款祈福，財神賜福！每一分捐款，將為您祈求財運亨通、事業順利，更為您和家人祈得平安健康、萬事如意。讓愛心化作福氣，與財神共行善道，福源滾滾而來！」
            </p>
          </div>
          <div className="relative">
            <Link
              href={PATHS.Service.child.Donate.path}
              className="relative inline-flex flex-row justify-center items-center gap-x-2 bg-secondary-600 rounded-full p-4 w-full max-w-[256px] btn-hover"
            >
              <p className="mobile-regular-h3 text-white lg:desktop-regular-h4">慈善捐款</p>
              <FaArrowRight className="text-white absolute top-1/2 right-8 -translate-y-1/2 lg:text-2xl lg:right-6" />
            </Link>
          </div>
        </div>

        <div className="relative space-y-4 max-w-[343px] mx-auto lg:aspect-[544/448] lg:w-[442px] lg:space-y-0 lg:max-w-none lg:mx-0 xl:w-[642px]">
          <Image
            alt="donate-god-01"
            src="/images/donate-01.png"
            width={512}
            height={801}
            className="aspect-[343/400] w-full lg:absolute lg:bottom-0 lg:left-0 lg:w-[190px] lg:aspect-[256/400] xl:w-[296px]"
          />

          <Image
            alt="donate-god-02"
            src="/images/donate-02.png"
            width={512}
            height={801}
            className="aspect-[343/400] w-full lg:absolute lg:top-0 lg:right-0 lg:w-[190px] lg:aspect-[256/400] xl:w-[296px]"
          />
        </div>
      </div>
    </div>
  )
}

export default DonateView
