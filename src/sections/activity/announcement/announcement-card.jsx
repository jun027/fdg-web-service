import { memo } from 'react'

function AnnouncementCard({ imageUrl, title, content, startDate, endDate }) {
  return (
    <div className="rounded-[6px] overflow-hidden shadow-announcement-card cursor-pointer hover:shadow-md duration-300">
      <div
        className="aspect-[343/256] w-full bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="p-6 h-[158px] flex flex-col justify-start items-stretch gap-y-3">
        <h6 className="desktop-bold-h6 text-primary-700 text-center h-6">{title}</h6>
        <div className="flex-1 overflow-hidden">
          <p className="text-dark-900 mobile-regular-h4 flex-1 text-ellipsis overflow-hidden whitespace-normal break-all line-clamp-2 text-center">
            {content}
          </p>
        </div>
        <p className="text-dark-900 mobile-regular-h4 text-center">{`${startDate} ~ ${endDate}`}</p>
      </div>
    </div>
  )
}

export default memo(AnnouncementCard)
