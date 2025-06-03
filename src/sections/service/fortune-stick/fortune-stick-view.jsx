'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import getPoemService from '@/services/order/getPoem'
import useAnimationBackdropContext from './store/use-animation-backdrop-context'
import FortuneStickAnimationBackdrop from './components/fortune-stick-animation-backdrop'
import FortunePaper from './components/fortune-paper'

function FortuneStickView() {
  const result = useAnimationBackdropContext((state) => state.result)
  const showResult = useAnimationBackdropContext((state) => state.showResult)
  const setOpen = useAnimationBackdropContext((state) => state.setOpen)
  const setResult = useAnimationBackdropContext((state) => state.setResult)
  const clearShowResult = useAnimationBackdropContext((state) => state.clearShowResult)
  const paperShow = showResult.title !== ''

  const fetchPoemData = useCallback(async () => {
    try {
      const { data } = await getPoemService()

      setResult({
        title: data?.title,
        body: data?.body,
        content: data?.content,
      })
    } catch (error) {
      console.error('Error during fetch poem data: ', error)
    }
  }, [setResult])

  const handlePlayFortuneStickClick = useCallback(async () => {
    clearShowResult()
    await fetchPoemData()
    setOpen(true)
  }, [clearShowResult, fetchPoemData, setOpen])

  return (
    <div className="relative">
      <div className=" max-w-650 mx-auto lg:min-h-[calc(100dvh-100px)] lg:max-w-[1119px] px-4 py-6 lg:flex lg:flex-col lg:justify-center">
        <div className="relative space-y-6 lg:flex lg:flex-col lg:items-center lg:justify-center lg:space-y-0 h-full">
          <div className="space-y-6 flex flex-col lg:w-full">
            <div className="max-w-[129px] mx-auto lg:max-w-[175px]">
              <Image
                className="aspect-[351/788] w-full"
                src={'/images/fortune-stick/fortune-stick-01.png'}
                alt="fortune-stick-logo"
                width={351}
                height={788}
              />
            </div>
            <button
              className="p-4 rounded-full bg-secondary-600 text-white mobile-regular-h3 btn-hover w-full max-w-[256px] mx-auto"
              onClick={handlePlayFortuneStickClick}
            >
              點我抽籤
            </button>
          </div>

          <div className="space-y-4 max-w-[317px] mx-auto lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2">
            <h3 className="text-primary-700 mobile-bold-h1">抽籤流程</h3>
            <div className="space-y-4">
              <p className="text-dark-900 mobile-regular-h3">(一)默念解惑事宜</p>
              <p className="text-dark-900 mobile-regular-h3">(二)開始求籤</p>
              <p className="text-dark-900 mobile-regular-h3">(三)賜籤</p>
              <p className="text-dark-900 mobile-regular-h3">(四)看籤文</p>
            </div>
            <h3 className="text-primary-700 mobile-bold-h1">遊戲規則</h3>
            <div className="space-y-1 max-w-[232px]">
              <p className="text-dark-900 mobile-regular-h3">・可以免費抽籤</p>
              <p className="text-dark-900 mobile-regular-h3">
                ・若是需要解籤，一次費性費用為新台幣 $66 元整
              </p>
            </div>
          </div>

          <FortunePaper
            show={paperShow}
            title={result.title}
            body={result.body}
            content={result.content}
            onButtonClick={() => {}}
          />
        </div>
      </div>

      <FortuneStickAnimationBackdrop />
    </div>
  )
}

export default FortuneStickView
