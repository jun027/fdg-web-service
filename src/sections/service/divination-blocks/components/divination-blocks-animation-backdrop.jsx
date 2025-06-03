'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import { BACKDROP_Z_INDEX_CONFIG } from '../../../../components/backdrop/backdrop-zIndex-config'
import useAnimationBackdropContext from '@/sections/service/divination-blocks/store/use-animation-backdrop-context'

const ANIMATION_DURATION = 2000
function DivinationBlocksAnimationBackdrop() {
  const [curStep, setCurStep] = useState('animation')
  const open = useAnimationBackdropContext((state) => state.open)
  const result = useAnimationBackdropContext((state) => state.result)
  const setOpen = useAnimationBackdropContext((state) => state.setOpen)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  useEffect(() => {
    let timer
    if (!open) {
      setCurStep('animation')
    } else {
      timer = setTimeout(() => {
        setCurStep('result')
      }, ANIMATION_DURATION)
    }
    return () => clearTimeout(timer)
  }, [open])

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 w-full h-full bg-black/50 duration-100',
        `z-[${BACKDROP_Z_INDEX_CONFIG.divinationBlocksAnimation}]`,
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Animation */}
      <div
        className={clsx(
          'absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 scale-[0.45] duration-200 lg:top-[50%] lg:scale-[0.65]',
          curStep === 'animation' ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div
          className="aspect-[683/513] w-[683px] animate-divination-blocks-animation"
          style={{
            backgroundImage: `url(/images/spritesheet/divination-blocks-spritesheet.png)`,
          }}
        />
      </div>

      {/* Result */}
      <div
        className={clsx(
          'absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 max-w-[358px] w-full mx-auto flex flex-col space-y-3 lg:top-[50%] duration-200',
          curStep === 'result' ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div
          className="aspect-[358/176] w-full bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage: `url("/images/paper-01.jpg")`,
          }}
        >
          <p className="desktop-bold-number-2 text-primary-700">{result.result}</p>
        </div>
        <button
          className={clsx('btn-hover', curStep === 'animation' && 'pointer-events-none')}
          onClick={handleClose}
        >
          <p className="text-white desktop-bold-number-1 text-center lg:desktop-bold-number-1">
            關閉
          </p>
        </button>
      </div>
    </div>
  )
}

export default memo(DivinationBlocksAnimationBackdrop)
