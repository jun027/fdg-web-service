import { memo, useMemo } from 'react'
import PrayerCard from './prayer-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CircularProgress } from '@mui/material'

function PrayerContainer({ isLoading = false, list = [] }) {
  const renderLoading = useMemo(() => {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress color="inherit" />
      </div>
    )
  }, [])

  const renderPrayerList = useMemo(() => {
    return (
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: '#activity .swiper-prev-button',
          nextEl: '#activity .swiper-next-button',
        }}
        slidesPerView={'auto'}
        className="!pb-8 lg:!pb-9"
      >
        {list.map((slide) => {
          return (
            <SwiperSlide
              key={slide.id}
              className="!w-[247px] [&:not(:last-child)]:mr-6"
              data-id={slide.id}
            >
              <PrayerCard
                name={slide.pray_object}
                date={slide.pray_date}
                content={slide.pray_content}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    )
  }, [list])

  return (
    <div className="space-y-6 lg:px-[54px]">
      <h2 className="text-white desktop-bold-number-2 text-center">祈福留言</h2>
      {isLoading && renderLoading}
      {!isLoading && renderPrayerList}
    </div>
  )
}

export default memo(PrayerContainer)
