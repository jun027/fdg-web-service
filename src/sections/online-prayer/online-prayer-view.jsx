'use client'

import FormProvider from '@/components/hook-form/form-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa6'
import { FaLocationArrow } from 'react-icons/fa6'
import { z } from 'zod'
import PrayerContainer from './components/prayer-container'
import newPrayService from '@/services/pray/newPray'
import toast from 'react-hot-toast'
import getPrayService from '@/services/pray/getPray'
import { useBoolean } from '@/hook/use-boolean'
import { v4 as uuidv4 } from 'uuid'
import PrayerNumberContainer from './components/prayer-number-container'

function OnlinePrayerView() {
  const [bgm01, setBgm01] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [prayList, setPrayList] = useState([])
  const [total, setTotal] = useState(0)
  const {
    value: onFetchPrayListLoading,
    onTrue: setOnFetchLoadingTrue,
    onFalse: setOnFetchLoadingFalse,
  } = useBoolean()

  const schema = z.object({
    prayerTarget: z.string().trim().min(1, '祈福對象不可為空'),
    prayerContent: z.string().trim().min(1, '祈福內容不可為空').max(150, '祈福內容最多150字'),
  })

  const defaultValues = {
    prayerTarget: '',
    prayerContent: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods

  const onPlayBGM = useCallback(() => {
    if (!isPlaying) {
      if (!bgm01) {
        const audio = new Audio('/assets/audio/prayer-bg-01.mp3')
        setBgm01(audio)
        audio.play()
      } else {
        bgm01.play()
      }
    } else {
      bgm01.pause()
    }
  }, [bgm01, isPlaying])

  const onFetchPrayList = useCallback(async () => {
    const payload = {
      page: null,
      limit: null,
    }

    try {
      setOnFetchLoadingTrue()
      const {
        code,
        data: { list, total },
      } = await getPrayService(payload)
      if (code === 0) {
        const formattedList = list.map((item) => ({
          id: uuidv4(),
          ...item,
        }))
        setPrayList(formattedList)
        setTotal(total)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setOnFetchLoadingFalse()
    }
  }, [setOnFetchLoadingFalse, setOnFetchLoadingTrue])

  const onSubmitButtonClick = useCallback(async (data) => {
    console.log('[onSubmitButtonClick] data: ', data)
    const payload = {
      pray_object: data.prayerTarget,
      pray_content: data.prayerContent,
    }

    try {
      const response = await newPrayService(payload)

      if (response.code === 0) {
        toast.success(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }, [])

  useEffect(() => {
    if (bgm01) {
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleEnded = () => setIsPlaying(false)

      bgm01.addEventListener('play', handlePlay)
      bgm01.addEventListener('pause', handlePause)
      bgm01.addEventListener('ended', handleEnded)

      // 清理函數
      return () => {
        bgm01.pause()
        setBgm01(null)
        bgm01.removeEventListener('play', handlePlay)
        bgm01.removeEventListener('pause', handlePause)
        bgm01.removeEventListener('ended', handleEnded)
      }
    }
  }, [bgm01])

  useEffect(() => {
    onFetchPrayList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/prayer-bg-01.jpg)',
      }}
    >
      <div className="max-w-650 mx-auto pt-[68px] pb-36 lg:max-w-[1440px] lg:pt-[135px] lg:pb-16">
        <div className="space-y-6 lg:space-y-0">
          {/* 線上祈福文字 */}
          <div className="space-y-6 px-4">
            <h1 className="text-white desktop-regular-h4 text-center lg:desktop-bold-number-2">
              線上祈福
            </h1>
            <p className="text-white desktop-light-p text-center lg:desktop-bold-number-1">
              在這個快節奏的時代，無論您身在何處，心中的願望都可以虔誠傳達給神明。
              <br />
              請閉上雙眼，誠心祈禱，默念您的祝福與願望，將心意化為祈福的力量傳遞出去。
              <br />
              祈福無需繁瑣的儀式，只需一顆虔誠的心。
              <br />
              相信神明將護佑您與家人，帶來平安、順遂與圓滿。
            </p>
            <button type="button" className="c-btn-prayer mx-auto" onClick={onPlayBGM}>
              <p className="text-white desktop-regular-h6">靜心音樂</p>
              {isPlaying ? (
                <FaPause className="text-xl text-white" />
              ) : (
                <FaPlay className="text-base text-white" />
              )}
            </button>
          </div>

          <div className="pb-16 lg:space-y-8 lg:pt-[150px] lg:pb-16">
            {/* 祈福人數 */}
            <div className="space-y-6 lg:px-[160px]">
              <h2 className="text-white desktop-bold-number-2 text-center">祈福人數</h2>
              <div className="flex flex-row items-center gap-x-1">
                {/* Deco Line - L */}
                <span
                  className="inline-block h-[1px] flex-1 bg-white"
                  style={{
                    background:
                      'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(229,232,235,1) 50%, rgba(222,226,230,1) 100%)',
                  }}
                />
                <PrayerNumberContainer number={total} />
                {/* Deco Line - R */}
                <span
                  className="inline-block h-[1px] flex-1 bg-white"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(229,232,235,1) 50%, rgba(222,226,230,1) 100%)',
                  }}
                />
              </div>
            </div>

            {/* 祈福表單 */}
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmitButtonClick)}
              className="space-y-6 px-4 lg:px-[160px]"
            >
              <div className="flex flex-col gap-y-2">
                <label className="text-white desktop-bold-number-1">祈福對象</label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  {...register('prayerTarget')}
                  placeholder="請輸入祈福對象"
                  className="border-white text-white border-1 rounded-4 bg-transparent py-3 px-4 desktop-regular-p placeholder:desktop-regular-p placeholder:text-white/60 focus:outline-none"
                />
                {errors.prayerTarget && (
                  <p className="text-red-500 text-xs">{errors.prayerTarget.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <label className="text-white desktop-bold-number-1">祈福內容</label>
                <textarea
                  disabled={isSubmitting}
                  {...register('prayerContent')}
                  maxLength={150}
                  placeholder="請輸入祈福內容(限制150字)"
                  className="border-white text-white border-1 rounded-4 bg-transparent py-3 px-4 desktop-regular-p h-48 placeholder:desktop-regular-p placeholder:text-white/60 focus:outline-none"
                />
                {errors.prayerContent && (
                  <p className="text-red-500 text-xs">{errors.prayerContent.message}</p>
                )}
              </div>

              <button type="submit" className="c-btn-prayer mx-auto" disabled={isSubmitting}>
                <p className="text-white desktop-regular-h6">送出祈福</p>
                <FaLocationArrow className="text-base text-white" />
              </button>
            </FormProvider>
          </div>

          <PrayerContainer isLoading={onFetchPrayListLoading} list={prayList} />
        </div>
      </div>
    </div>
  )
}

export default OnlinePrayerView
