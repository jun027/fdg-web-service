'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'

import { palette } from '@/style/config'

import { ACTIVITY_LIST_CONFIG } from './constants/activity-list-config'
import ActivityCard from './components/activity-card'
import useIsDesktop from '@/hook/use-is-desktop'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'

import Link from 'next/link'
import { PATHS } from '@/routes/page'
import { useRouter } from '@/routes/hooks'

function ActivityView() {
  const router = useRouter()
  const isDesktop = useIsDesktop()
  const backgroundColor = isDesktop
    ? 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,245,237,1) 100%)'
    : `${palette.common.background}`

  const handleClickActivityCard = (e) => {
    const id = e.currentTarget.getAttribute('data-id')
    router.push(`${PATHS.Activity.child.Announcement.child.Article.path}/${id}?from=home`)
  }

  return (
    <div id="activity" style={{ background: backgroundColor }}>
      <div className="relative max-w-650 mx-auto px-4 space-y-6 lg:max-w-1440 lg:space-y-9 lg:py-12">
        <div className="hidden lg:inline-block absolute top-10 right-0 z-0">
          <Image
            src={'/images/deco/cloud-01.png'}
            alt="cloud-01"
            width={1225}
            height={593}
            className="aspect-[1225/593] w-[612px]"
          />
        </div>
        <div className="hidden lg:inline-block absolute -bottom-20 left-0 z-0">
          <Image
            src={'/images/deco/cloud-02.png'}
            alt="cloud-02"
            width={650}
            height={315}
            className="aspect-[650/315] w-[346px]"
          />
        </div>

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
              最新活動公告內容
            </h2>
            <p className="text-dark-700 desktop-regular-p lg:desktop-regular-h6 lg:text-center lg:max-w-[1160px] lg:mx-auto">
              一年之計在於春，補財庫迎新年！元月八號、九號，我們誠邀您參加天公生補財庫活動，一同祈求新的一年財運亨通、事事順遂。
            </p>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="relative z-10 lg:px-[130px]">
          <button
            type="button"
            className="hidden lg:inline-block swiper-prev-button absolute top-[calc((100%-36px)/2)] -translate-y-1/2 left-6 z-10 w-12"
          >
            <Image
              src={'/images/buttons/btn-pagination-01.png'}
              alt="pagination-l"
              width={93}
              height={178}
              className="aspect-[93/178] w-full"
            />
          </button>
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: '#activity .swiper-prev-button',
              nextEl: '#activity .swiper-next-button',
            }}
            slidesPerView={'auto'}
            className="!pb-8 lg:!pb-9"
            style={{
              '--swiper-pagination-color': palette.primary[500],
              '--swiper-pagination-bullet-inactive-color': palette.dark[300],
              '--swiper-pagination-bullet-inactive-opacity': '1',
              '--swiper-pagination-bullet-size': isDesktop ? '12px' : '8px',
              '--swiper-pagination-bottom': '0px',
            }}
          >
            {ACTIVITY_LIST_CONFIG.map((slide) => {
              return (
                <SwiperSlide
                  key={slide.id}
                  className="px-1 pt-1 !w-[320px] lg:!w-[350px] [&:not(:last-child)]:mr-2 lg:[&:not(:last-child)]:mr-12"
                  onClick={handleClickActivityCard}
                  data-id={slide.id}
                >
                  <ActivityCard
                    imageUrl={slide.imageUrl}
                    title={slide.title}
                    content={slide.previewContent}
                    startDate={slide.startDate}
                    endDate={slide.endDate}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
          <button
            type="button"
            className="hidden lg:inline-block swiper-next-button absolute top-[calc((100%-36px)/2)] -translate-y-1/2 right-6 z-10 w-12"
          >
            <Image
              src={'/images/buttons/btn-pagination-01.png'}
              alt="pagination-r"
              width={93}
              height={178}
              className="aspect-[93/178] w-full -scale-x-100"
            />
          </button>
        </div>

        {/* More Activity */}
        <div className="relative z-10 flex justify-center items-center">
          <Link
            href={PATHS.Activity.child.Announcement.path}
            target="_self"
            className="inline-flex flex-row gap-x-1 items-center px-3 py-1 rounded-4 hover:bg-primary-700/10 duration-200"
          >
            <p className="text-dark-700 mobile-regular-h3 lg:desktop-regular-h5">更多項目</p>
            <MdOutlineKeyboardDoubleArrowRight
              size={isDesktop ? 24 : 24}
              className="text-dark-700 -ml-1"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ActivityView
