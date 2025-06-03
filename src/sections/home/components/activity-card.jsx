import { memo } from 'react'

function ActivityCard({ imageUrl, title, content, startDate, endDate }) {
  return (
    <div className="rounded-[6px] overflow-hidden shadow-announcement-card cursor-pointer hover:shadow-md duration-300">
      <div
        role="img"
        className="aspect-[343/256] w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="p-6 space-y-3 bg-background">
        <h6 className="text-primary-700 desktop-bold-h6 text-center">{title}</h6>
        <div className="flex-1 overflow-hidden">
          <p className="text-dark-900 mobile-regular-h4 flex-1 text-ellipsis overflow-hidden whitespace-normal break-all line-clamp-2 text-center lg:desktop-regular-p">
            {content}
          </p>
        </div>
        <p className="text-dark-900 mobile-regular-h4 text-center lg:desktop-regular-p">{`${startDate} ~ ${endDate}`}</p>
      </div>
    </div>
  )
}

export default memo(ActivityCard)
