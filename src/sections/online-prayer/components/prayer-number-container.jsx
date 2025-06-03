import { memo, useMemo } from 'react'
import PrayerNumberBlock from './prayer-number-block'

function PrayerNumberContainer({ number }) {
  const digits = useMemo(() => {
    let cappedNum = 0
    if (number < 0) {
      cappedNum = 0
    } else if (number > 9999999) {
      cappedNum = 9999999
    } else {
      cappedNum = number
    }

    const numberStr = cappedNum.toString().padStart(7, '0')

    return numberStr.split('').map((digit) => parseInt(digit, 10))
  }, [number])

  return (
    <div className="flex gap-x-2">
      <PrayerNumberBlock number={digits[0]} />
      <PrayerNumberBlock number={digits[1]} />
      <PrayerNumberBlock number={digits[2]} />
      <PrayerNumberBlock number={digits[3]} />
      <PrayerNumberBlock number={digits[4]} />
      <PrayerNumberBlock number={digits[5]} />
      <PrayerNumberBlock number={digits[6]} />
    </div>
  )
}

export default memo(PrayerNumberContainer)
