import { memo } from 'react'

function PrayerNumberBlock({ number = 0 }) {
  return (
    <p className="w-[25px] h-[35px] border-1 border-white/50 rounded-4 flex justify-center items-center text-white desktop-light-h4">
      {number}
    </p>
  )
}

export default memo(PrayerNumberBlock)
