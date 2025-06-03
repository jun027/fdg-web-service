'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import { VIDEO_LIST_CONFIG } from './constants/video-list-config'
import { PATHS } from '@/routes/page'
import Link from 'next/link'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import VideoCard from './components/video-card'
import useIsDesktop from '@/hook/use-is-desktop'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

function EventVideo() {
  const isDesktop = useIsDesktop(1024)

  return (
    <div id="event-video" className="overflow-hidden bg-background">
      <div className="relative max-w-650 mx-auto px-4 space-y-6 lg:max-w-1440 lg:space-y-9 lg:pb-12">
        {/* Title & Description */}
        <div className="relative z-10 space-y-6 lg:space-y-1">
          {/* Deco & Line */}
          <div className="relative flex justify-center items-center lg:max-w-[1200px] lg:mx-auto">
            <div className="relative flex-1 h-[1px]">
              <div
                className="rounded-full absolute -right-4 top-1/2 -translate-y-1/2 w-[125%] h-full lg:w-[95%] lg:left-1/2 lg:-translate-x-1/2"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(250,195,2,0) 0%, rgba(250,195,2,1) 12%, rgba(250,195,2,1) 88%, rgba(250,195,2,0) 100%)',
                }}
              />
            </div>
            <Image
              src={'/images/deco/diamond-shape-01.png'}
              alt="diamond-shape"
              width={233}
              height={142}
              className="w-[116px]"
            />
            <div className="relative flex-1 h-[1px]">
              <div
                className="rounded-full absolute -left-4 top-1/2 -translate-y-1/2 w-[125%] h-full lg:w-[95%] lg:left-1/2 lg:-translate-x-1/2"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(250,195,2,0) 0%, rgba(250,195,2,1) 12%, rgba(250,195,2,1) 88%, rgba(250,195,2,0) 100%)',
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 lg:space-y-4">
            <h2 className="text-primary-700 mobile-bold-h1 text-center lg:desktop-bold-h2">
              活動影音
            </h2>
            <p className="text-dark-700 desktop-regular-p lg:desktop-regular-h6 lg:text-center lg:max-w-[1160px] lg:mx-auto">
              「恆春搶孤」是一年一度的傳統民俗活動，融合勇氣與團結精神。參加者攀爬高桿，爭奪頂端的象徵性旗幟，寓意祈求平安和豐收。這場活動不僅展現了力與美，也傳承了恆春的文化精髓，歡迎您一同來體驗！
            </p>
          </div>
        </div>

        {/* Swiper Container - desktop */}
        {isDesktop && (
          <div className="relative z-10 lg:px-[140px] hidden lg:block">
            <button
              type="button"
              className="hidden lg:inline-block swiper-prev-button absolute top-[calc((100%-36px)/2)] -translate-y-1/2 left-6 z-10 w-[72px]"
            >
              <Image
                src={'/images/buttons/btn-pagination-02.png'}
                alt="pagination-l"
                width={145}
                height={145}
                className="aspect-square w-full"
              />
            </button>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: '#event-video .swiper-prev-button',
                nextEl: '#event-video .swiper-next-button',
              }}
              grabCursor
              centeredSlides={true}
              slidesPerView={'auto'}
              spaceBetween={16}
              initialSlide={1}
            >
              {VIDEO_LIST_CONFIG.map((slide) => {
                return (
                  <SwiperSlide key={slide.id} className="!w-[640px] space-y-3">
                    <div className="aspect-[640/360] w-[640px] space-y-3">
                      <p className="px-20 text-center text-dark-900 desktop-regular-h5 text-ellipsis overflow-hidden whitespace-nowrap">
                        {slide.title}
                      </p>
                      <LiteYouTubeEmbed
                        id={slide.videoId}
                        title={slide.title}
                        noCookie={true}
                        poster="maxresdefault"
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <button
              type="button"
              className="hidden lg:inline-block swiper-next-button absolute top-[calc((100%-36px)/2)] -translate-y-1/2 right-6 z-10 w-[72px]"
            >
              <Image
                src={'/images/buttons/btn-pagination-02.png'}
                alt="pagination-r"
                width={145}
                height={145}
                className="aspect-square w-full -scale-x-100"
              />
            </button>
          </div>
        )}

        {/* Swiper Container - mobile */}
        {!isDesktop && (
          <div className="space-y-9 lg:hidden">
            <div className="space-y-9 max-w-[343px] md:max-w-[618px] mx-auto">
              <VideoCard title="恆春郡福德宮平安遶境 04 壬寅年農曆08月10日" videoId="nYghCWuHRjY" />
              <span className="inline-block w-full h-[1px] bg-secondary-100" />
            </div>

            <div className="space-y-9 max-w-[343px] md:max-w-[618px] mx-auto">
              <VideoCard title="恆春郡福德宮平安遶境 04 壬寅年農曆08月10日" videoId="nYghCWuHRjY" />
              <span className="inline-block w-full h-[1px] bg-secondary-100" />
            </div>

            <div className="space-y-9 max-w-[343px] md:max-w-[618px] mx-auto">
              <VideoCard title="恆春郡福德宮平安遶境 04 壬寅年農曆08月10日" videoId="nYghCWuHRjY" />
            </div>
          </div>
        )}

        {/* More Activity */}
        <div className="relative z-10 flex justify-center items-center">
          <Link
            href={PATHS.Home.path}
            target="_self"
            className="inline-flex flex-row gap-x-1 items-center px-3 py-1 rounded-4 hover:bg-gray-600 hover:bg-opacity-10 duration-200"
          >
            <p className="text-dark-700 mobile-regular-h3 lg:desktop-regular-h5">更多影片</p>
            <MdOutlineKeyboardDoubleArrowRight size={24} className="text-dark-700 -ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventVideo
