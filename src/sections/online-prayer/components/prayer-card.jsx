import { memo } from 'react'
import { FaPrayingHands } from 'react-icons/fa'

function PrayerCard({ name, date, content }) {
  return (
    <div
      className="aspect-[490/802] bg-cover bg-center bg-no-repeat pt-[76px]"
      style={{
        backgroundImage: 'url(/images/prayer-card-bg-01.png)',
      }}
    >
      <div className="px-6 py-5 h-full space-y-2">
        <div className="flex flex-row items-center gap-x-2">
          <p className="flex items-center gap-x-1">
            <FaPrayingHands className="text-secondary-600 text-sm" />
            <span className="inline-block text-secondary-600 desktop-light-p">祈福人</span>
          </p>
          <p className="text-secondary-600 desktop-regular-h6">{name}</p>
        </div>

        <p className="w-full h-[1px] bg-secondary-600/25" />

        <p className="text-secondary-600 desktop-light-p">{date}</p>

        <div className="h-[calc(100%-24px-21px-1px-24px)] overflow-y-auto">
          <p className="text-secondary-600 desktop-regular-p">{content}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(PrayerCard)
