'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import RelatedIndustriesCard from './components/related-industries-card'
import { INDUSTRIES_LIST_CONFIG } from './constants/industries-list-config'
import { palette } from '@/style/config'

function RelatedIndustries() {
  return (
    <div id="related-industries" className="bg-background px-4 pb-8 lg:px-20 lg:pt-12">
      <div className="max-w-650 mx-auto space-y-8 lg:space-y-12 lg:max-w-[1280px]">
        <div className="space-y-4">
          <h2 className="mobile-bold-h1 text-primary-700 text-center lg:desktop-bold-h2">
            相關產業
          </h2>
          <p className="mobile-regular-h4 text-dark-600 lg:desktop-regular-h6 lg:max-w-[908px] lg:mx-auto lg:text-center">
            我們集團橫跨多元產業領域，從創新科技、商業服務到文化創意，致力於推動各行業的整合與協作。透過匯集多方資源，我們不僅創造價值，更引領市場趨勢。了解我們在各產業的足跡，發掘更多合作契機，與我們一同攜手邁向更光明的未來。
          </p>
        </div>

        <Swiper
          pagination={{
            clickable: true,
          }}
          grabCursor
          modules={[Pagination]}
          slidesPerView={'auto'}
          className="!pb-8"
          style={{
            '--swiper-pagination-color': palette.primary[500],
            '--swiper-pagination-bullet-inactive-color': palette.dark[300],
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-bullet-size': '8px',
            '--swiper-pagination-bottom': '0px',
          }}
        >
          {INDUSTRIES_LIST_CONFIG.map((slide) => {
            return (
              <SwiperSlide key={slide.id} className="!w-[155px] mr-4 lg:mr-8">
                {slide.linkUrl ? (
                  <a
                    href={slide.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <div className="w-full h-[176px]">
                      <RelatedIndustriesCard
                        imageUrl={slide.imageUrl}
                        title={slide.title}
                        width={278}
                        height={177}
                      />
                    </div>
                  </a>
                ) : (
                  <div className="w-full h-[176px]">
                    <RelatedIndustriesCard
                      imageUrl={slide.imageUrl}
                      title={slide.title}
                      width={278}
                      height={177}
                    />
                  </div>
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default RelatedIndustries
