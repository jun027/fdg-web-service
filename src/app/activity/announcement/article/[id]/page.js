import { AnnouncementDetail } from '@/sections/activity/announcement'
import { ANNOUNCEMENT_DATA_LIST } from '@/sections/activity/announcement/constants/data-list-config'
import { notFound } from 'next/navigation'

export default function ArticlePage({ params }) {
  const { id } = params

  const data = ANNOUNCEMENT_DATA_LIST.find((item) => item.id === id)

  if (!data) {
    return notFound()
  }

  const nextIndex = ANNOUNCEMENT_DATA_LIST.findIndex((item) => item.id === id) + 1
  const nextId = ANNOUNCEMENT_DATA_LIST[nextIndex]?.id

  const prevIndex = ANNOUNCEMENT_DATA_LIST.findIndex((item) => item.id === id) - 1
  const prevId = ANNOUNCEMENT_DATA_LIST[prevIndex]?.id

  return (
    <AnnouncementDetail
      title={data.detailTitle}
      imgUrl={data.imageUrls[0]}
      dateStart={data.startDate}
      dateEnd={data.endDate}
      content={data.content}
      nextId={nextId}
      prevId={prevId}
    />
  )
}
