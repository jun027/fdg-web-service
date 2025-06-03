'use client'

import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import { useRouter, useSearchParams } from '@/routes/hooks'
import { PATHS } from '@/routes/page'
import clsx from 'clsx'
import { Suspense } from 'react'

function AnnouncementDetailContainer({
  title,
  imgUrl,
  dateStart,
  dateEnd,
  content,
  nextId,
  prevId,
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from')
  const page = searchParams.get('page')

  const handlePrevOnClick = () => {
    router.push(
      `${PATHS.Activity.child.Announcement.child.Article.path}/${prevId}?from=${from}&page=${page}`
    )
  }

  const handleBackOnClick = () => {
    if (from === 'announcement') {
      router.push(`${PATHS.Activity.child.Announcement.path}?page=${page}`)
    } else {
      router.push(PATHS.Home.path)
    }
  }

  const handleNextOnClick = () => {
    router.push(
      `${PATHS.Activity.child.Announcement.child.Article.path}/${nextId}?from=${from}&page=${page}`
    )
  }

  return (
    <div className="px-4 py-6 lg:py-12 lg:px-10">
      <div className="max-w-650 mx-auto flex flex-col space-y-6 lg:max-w-[1120px] lg:space-y-9">
        <div className="gap-y-6 lg:gap-y-9 flex flex-col items-center lg:flex-col-reverse">
          <h1 className="text-primary-700 mobile-bold-h1 text-center lg:desktop-bold-h2">
            {title}
          </h1>
          <div
            className="w-full aspect-[343/256] bg-no-repeat bg-cover bg-center rounded-[6px] lg:aspect-[1120/630] lg:rounded-none"
            style={{
              backgroundImage: `url(${imgUrl})`,
            }}
          />
        </div>
        <div className="space-y-24">
          <div className="space-y-3">
            <p className="text-dark-900 mobile-regular-h4 text-center lg:desktop-regular-h6 lg:text-left">{`${dateStart} ~ ${dateEnd}`}</p>
            <p
              className="text-dark-900 mobile-regular-h4 lg:desktop-regular-h5"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              disabled={!prevId}
              className={clsx(
                'c-announcement-prev-button pl-1 pr-2',
                !prevId && 'c-announcement-prev-button-disabled'
              )}
              onClick={handlePrevOnClick}
            >
              <IoIosArrowBack size={20} />
              <p>上一則</p>
            </button>
            <button
              className="text-primary-700 desktop-regular-h6 px-4 py-2 min-w-[96px] rounded-4 border-1 border-primary-700 hover:bg-primary-700/10 duration-150 lg:min-w-[311px]"
              onClick={handleBackOnClick}
            >
              回上一頁
            </button>
            <button
              disabled={!nextId}
              className={clsx(
                'c-announcement-next-button pr-1 pl-2',
                !nextId && 'c-announcement-next-button-disabled'
              )}
              onClick={handleNextOnClick}
            >
              <p>下一則</p>
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnnouncementDetail(props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AnnouncementDetailContainer {...props} />
    </Suspense>
  )
}

export default AnnouncementDetail
