'use client'

import { Pagination } from '@mui/material'
import { palette } from '@/style/config'
import { useSearchParams, useRouter } from '@/routes/hooks'
import AnnouncementCard from './announcement-card'
import { ANNOUNCEMENT_DATA_LIST } from './constants/data-list-config'
import { PATHS } from '@/routes/page'
import { Suspense } from 'react'

function AnnouncementViewContainer() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = searchParams.get('page')

  const dataLength = ANNOUNCEMENT_DATA_LIST.length
  const maxPage = Math.ceil(dataLength / 6)
  const currentPage = page ? Math.min(parseInt(page), maxPage) : 1 // 確保 currentPage 不超過 maxPage

  const sliceDataList = ANNOUNCEMENT_DATA_LIST.slice((currentPage - 1) * 6, currentPage * 6)

  if (sliceDataList.length === 0 && currentPage > 1) {
    router.push(`/activity/announcement?page=${maxPage}`)
  }

  const handleChangePage = (_, value) => {
    router.push(`${PATHS.Activity.child.Announcement.path}?page=${value}`)
  }

  const handleCardOnClick = (e) => {
    const id = e.currentTarget.getAttribute('data-id')
    router.push(
      `${PATHS.Activity.child.Announcement.child.Article.path}/${id}?from=announcement&page=${currentPage}`
    )
  }

  return (
    <div className="px-4 py-6 lg:px-10 lg:py-12">
      <div className="max-w-650 mx-auto space-y-9 lg:max-w-[1114px] lg:space-y-6">
        <div className="space-y-4">
          <h1 className="mobile-bold-h1 text-primary-700 text-center lg:desktop-bold-h2">
            最新活動公告內容
          </h1>
          <p className="mobile-regular-h4 text-dark-700 lg:desktop-regular-h5">
            一年之計在於春，補財庫迎新年！元月八號、九號，我們誠邀您參加天公生補財庫活動，一同祈求新的一年財運亨通、事事順遂。
          </p>
        </div>

        <div className="flex flex-col items-start gap-y-9 max-w-[343px] mx-auto lg:max-w-none lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-10 lg:gap-y-6 lg:min-h-[852px]">
          {sliceDataList.map((item) => {
            return (
              <div
                key={item.id}
                className="max-w-[343px]"
                data-id={item.id}
                onClick={handleCardOnClick}
              >
                <AnnouncementCard
                  title={item.title}
                  content={item.previewContent}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  imageUrl={item.imageUrls[0] || null}
                />
              </div>
            )
          })}
        </div>

        <Pagination
          count={maxPage}
          page={currentPage}
          size="large"
          className="flex justify-center items-center text-primary-700"
          sx={{
            '& .MuiPaginationItem-root': {
              color: palette.primary[700],
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: palette.primary[700] + ' !important',
              color: palette.common.white + ' !important',
            },
          }}
          onChange={handleChangePage}
        />
      </div>
    </div>
  )
}

function AnnouncementView() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AnnouncementViewContainer />
    </Suspense>
  )
}

export default AnnouncementView
