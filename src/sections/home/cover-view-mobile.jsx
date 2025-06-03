'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation } from 'swiper/modules'
import { COVER_LIST_CONFIG } from './constants/cover-list-config'
import Image from 'next/image'
import { IoMdArrowRoundForward } from 'react-icons/io'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

function CoverViewMobile() {
  const [activeIndex, setActiveIndex] = useState(0)
  const curContent = COVER_LIST_CONFIG[activeIndex].content
  const curProgress = (activeIndex / (COVER_LIST_CONFIG.length - 1)) * 100

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)
  }

  return (
    <div id="cover">
      <Swiper
        modules={[EffectFade, Navigation]}
        effect="fade"
        navigation={{
          prevEl: '#cover .swiper-prev-button',
          nextEl: '#cover .swiper-next-button',
        }}
        onSlideChange={handleSlideChange}
        slidesPerView={1}
      >
        {COVER_LIST_CONFIG.map((slide) => {
          return (
            <SwiperSlide key={slide.id} className="relative">
              <Image
                src={slide.mobileImgUrl}
                alt="cover"
                width={750}
                height={422}
                className="relative z-0 aspect-[750/422] w-full"
              />
              <div
                className="absolute left-0 bottom-0 w-full h-2/4"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(250,245,237,1) 100%)',
                }}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className="relative max-w-650 mx-auto space-y-3 mt-6">
        {/* progress bar */}
        <div className="px-4">
          <div className="relative w-full h-[2px] rounded-full bg-white overflow-hidden">
            <div
              className="absolute z-10 w-full h-full duration-200"
              style={{
                transform: `translateX(${curProgress}%)`,
              }}
            >
              <p className="w-full h-full bg-secondary-700 relative -translate-x-full" />
            </div>
          </div>
        </div>

        {/* Service name */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={curContent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="mobile-regular-number-1 bg-gradient-to-b from-[#FF4500] to-[#FFA500] text-transparent bg-clip-text">
                {COVER_LIST_CONFIG[activeIndex].label}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center px-4">
          <button className="swiper-prev-button">
            <Image
              src={'/images/buttons/btn-pagination-02.png'}
              alt="arrow-left"
              width={145}
              height={145}
              className="aspect-square w-12"
            />
          </button>
          <button className="swiper-next-button">
            <Image
              src={'/images/buttons/btn-pagination-02.png'}
              alt="arrow-right"
              width={145}
              height={145}
              className="aspect-square w-12 -scale-x-100"
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center items-center gap-y-9">
          <AnimatePresence mode="wait">
            <motion.p
              key={curContent}
              className="text-dark-900 mobile-regular-h4 text-center px-4 h-[84px] flex items-center"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              dangerouslySetInnerHTML={{ __html: curContent }}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div role="link" key={curContent} transition={{ duration: 0.25 }}>
              <Link
                href={COVER_LIST_CONFIG[activeIndex].buttonLink}
                className="inline-flex relative flex-row justify-center items-center gap-x-3 w-[256px] rounded-full bg-secondary-600 text-white mobile-regular-h3 text-center py-4"
              >
                {COVER_LIST_CONFIG[activeIndex].buttonText}
                <IoMdArrowRoundForward className="absolute right-8 top-1/2 -translate-y-1/2 text-xl" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default CoverViewMobile
