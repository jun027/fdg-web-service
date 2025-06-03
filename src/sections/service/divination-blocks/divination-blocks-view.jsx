'use client'

import Image from 'next/image'
import { useCallback } from 'react'

import useAnimationBackdropContext from '@/sections/service/divination-blocks/store/use-animation-backdrop-context'
import DivinationBlocksAnimationBackdrop from './components/divination-blocks-animation-backdrop'

import getThrowJiaoService from '@/services/order/getThrowJiao'
import { useBoolean } from '@/hook/use-boolean'

function DivinationBlocksView() {
  const setOpen = useAnimationBackdropContext((state) => state.setOpen)
  const { value: isLoading, onTrue: loadingOnTrue, onFalse: loadingOnFalse } = useBoolean(false)

  const fetchThrowJiaoResult = useCallback(async () => {
    try {
      loadingOnTrue()
      const { data } = await getThrowJiaoService()
      setOpen(true, data)
    } catch (error) {
      console.error(error)
    } finally {
      loadingOnFalse()
    }
  }, [loadingOnFalse, loadingOnTrue, setOpen])

  const handlePlayButtonClick = useCallback(async () => {
    await fetchThrowJiaoResult()
  }, [fetchThrowJiaoResult])

  return (
    <div className="relative">
      <div className="flex flex-col items-center max-w-[375px] mx-auto p-4 space-y-12 lg:space-y-0 lg:flex-row-reverse lg:items-stretch lg:gap-x-10 lg:max-w-1440 lg:py-28 lg:px-40 lg:min-h-[700px] lg:h-[calc(100dvh-94px-353px)] lg:max-h-[1500px]">
        <div className="w-full lg:flex-1 lg:flex lg:flex-row-reverse lg:items-center lg:gap-x-[88px]">
          {/* User Info */}
          <div className="flex justify-center gap-x-9 items-center lg:flex-col lg:gap-y-12 lg:gap-x-0 lg:w-[144px]">
            {/* <InfoBlock title="我的錢包" label="$100" />
            <InfoBlock title="目前積分" label="0分" />
            <InfoBlock title="剩餘次數" label="2次" /> */}
          </div>

          {/* Playground */}
          <div className="w-full space-y-6 lg:flex lg:flex-1 lg:space-y-10 lg:flex-col lg:items-center">
            <div className="relative aspect-[255/192] max-w-[255px] mx-auto lg:aspect-[340/256] lg:max-w-[340px] lg:w-full">
              <Image
                src={'/images/divination-block/divination-blocks-single-01.png'}
                alt="divination-blocks-single-01"
                width={276}
                height={317}
                className="absolute top-1/2 left-[30%] z-0 aspect-[276/317] w-[138px] -translate-x-1/2 -translate-y-1/2 rotate-[-17deg] lg:w-[184px]"
              />
              <Image
                src={'/images/divination-block/divination-blocks-single-02.png'}
                alt="divination-blocks-single-02"
                width={201}
                height={306}
                className="absolute top-1/2 right-[35%] z-0 aspect-[100/153] w-[100px] translate-x-1/2 -translate-y-1/2 rotate-[-32deg] lg:w-[134px]"
              />
            </div>
            <button
              disabled={isLoading}
              className="bg-secondary-600 text-white py-4 px-9 rounded-full mobile-regular-h3 w-full btn-hover lg:max-w-[256px] lg:desktop-regular-h4"
              onClick={handlePlayButtonClick}
            >
              點我擲筊
            </button>
          </div>
        </div>

        {/* Rules */}
        <div className="w-full flex flex-col items-start gap-y-2 lg:max-w-[333px] lg:w-[30%] lg:gap-y-4">
          <div className="flex flex-col items-start space-y-2 lg:space-y-4">
            <h4 className="text-primary-700 mobile-bold-h1 lg:desktop-bold-h4">遊戲規則</h4>
            <p className="text-dark-900 mobile-regular-h3 lg:desktop-regular-h6">
              在這裡，你可以免費體驗擲筊的樂趣！只需輕鬆一擲，就能得到三種結果之一：
            </p>
            <ul className="text-dark-900 mobile-regular-h3 lg:desktop-regular-h6">
              <li>・聖筊：象徵事情順利，是一個肯定的好兆頭。</li>
              <li>・笑筊：帶著一點幽默，表示答案還需要再考慮。</li>
              <li>・陰筊：陰筊：提醒可能還需要更多努力或等待時機。</li>
            </ul>
          </div>
        </div>
      </div>

      <DivinationBlocksAnimationBackdrop />
    </div>
  )
}

export default DivinationBlocksView
