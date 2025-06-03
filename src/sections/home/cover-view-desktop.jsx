'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { COVER_LIST_CONFIG } from './constants/cover-list-config'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { IoMdArrowRoundForward } from 'react-icons/io'

import './styles/card.styles.css'

function CoverViewDesktop() {
  const [activeIndex, setActiveIndex] = useState(0)
  const curContent = COVER_LIST_CONFIG[activeIndex]
  const curProgress = (activeIndex / (COVER_LIST_CONFIG.length - 1)) * 100

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex)
  }

  return (
    <div
      id="cover-d"
      className="bg-background relative px-10 pt-[174px] pb-[172px] h-[calc(100dvh-94px)] max-h-[716px] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute z-0 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={curContent.desktopBgImgUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              backgroundImage: `url(${curContent.desktopBgImgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            className="relative z- 0w-full h-full"
          />
        </AnimatePresence>

        <div
          className="absolute z-10 top-0 left-0 w-3/4 h-full"
          style={{
            background:
              'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(251,246,239,1) 50%, rgba(250,245,237,1) 100%)',
          }}
        />

        <div
          className="absolute z-20 bottom-0 left-0 w-full h-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 75%, rgba(251,246,239,1) 95%, rgba(250,245,237,1) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1116px] mx-auto flex flex-row justify-between items-start gap-x-[30px]">
        <div className="w-[467px] space-y-12">
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={curContent.content}
                initial={{ opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start"
              >
                <p className="lg:desktop-bold-number-3 bg-gradient-to-b from-[#FF4500] to-[#FFA500] text-transparent bg-clip-text">
                  {COVER_LIST_CONFIG[activeIndex].label}
                </p>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={curContent.content}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                transition={{ delay: 0.025, duration: 0.25 }}
                className="text-dark-700 desktop-regular-h5"
                dangerouslySetInnerHTML={{ __html: curContent.content }}
              />
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={curContent.content}
              initial={{ opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.05, duration: 0.25 }}
            >
              <Link
                href={curContent.buttonLink}
                className="inline-block relative bg-secondary-700 rounded-full py-4 w-64 text-center btn-hover"
              >
                <p className="text-white desktop-regular-h4">{curContent.buttonText}</p>
                <IoMdArrowRoundForward className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl text-white" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:w-[480px] xl:w-[615px] h-[269px] relative flex flex-col gap-y-[72px] pointer-events-auto">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '#cover-d .swiper-prev-button',
              nextEl: '#cover-d .swiper-next-button',
            }}
            onSlideChange={handleSlideChange}
            centeredSlides={true}
            slidesPerView={'auto'}
            spaceBetween={24}
          >
            {COVER_LIST_CONFIG.map((slide) => {
              return (
                <SwiperSlide key={slide.id} className="!w-[180px] rounded-4 overflow-hidden">
                  <div
                    className="relative z-0 border-1 border-white rounded-2xl h-full"
                    style={{
                      backgroundImage: `url(${slide.cardImgUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <div className="mask absolute top-0 left-0 w-full h-full z-10 bg-black bg-opacity-60 rounded-2xl" />
                </SwiperSlide>
              )
            })}
          </Swiper>

          <div className="absolute z-10 bottom-0 left-0 translate-y-[100%] w-full flex flex-row gap-x-6 items-center pt-[72px]">
            <div className="flex flex-row gap-x-6">
              <button className="swiper-prev-button">
                <Image
                  src={'/images/buttons/btn-pagination-02.png'}
                  alt="divination-blocks-icon"
                  width={145}
                  height={145}
                  className="aspect-square w-[72px]"
                />
              </button>
              <button className="swiper-next-button">
                <Image
                  src={'/images/buttons/btn-pagination-02.png'}
                  alt="divination-blocks-icon"
                  width={145}
                  height={145}
                  className="aspect-square w-[72px] -scale-x-100"
                />
              </button>
            </div>

            <div className="relative flex-1 h-[2px] bg-white rounded-full overflow-hidden">
              <div
                className="absolute z-10 w-full h-full duration-200"
                style={{
                  transform: `translateX(${curProgress}%)`,
                }}
              >
                <p className="w-full h-full bg-secondary-700 -translate-x-full" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.p key={curContent.content} className="text-secondary-700 desktop-bold-h1">
                {`0${activeIndex + 1}`}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverViewDesktop
