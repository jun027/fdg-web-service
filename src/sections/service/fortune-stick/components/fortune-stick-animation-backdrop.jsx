import { useRef, memo, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { BACKDROP_Z_INDEX_CONFIG } from '@/components/backdrop/backdrop-zIndex-config'
import useAnimationBackdropContext from '../store/use-animation-backdrop-context'

gsap.registerPlugin(useGSAP)

function FortuneStickAnimationBackdrop() {
  const open = useAnimationBackdropContext((state) => state.open)
  const setOpen = useAnimationBackdropContext((state) => state.setOpen)
  const result = useAnimationBackdropContext((state) => state.result)
  const registerAnimationPlay = useAnimationBackdropContext((state) => state.registerAnimationPlay)
  const transferResultToShowResult = useAnimationBackdropContext(
    (state) => state.transferResultToShowResult
  )

  const fortuneNo = result.title?.split('(')[0]
  const fortuneName = result.title?.split('(')[1]?.split(')')[0]

  const containerRef = useRef(null)
  const [animationDown, setAnimationDown] = useState(false)
  const { contextSafe } = useGSAP({ scope: containerRef })

  const onAnimationComplete = useCallback(() => {
    setAnimationDown(true)
  }, [])

  const onPlayAnimation = contextSafe(() => {
    // Step 1: Set initial opacity to 0 for both elements
    gsap.set(['.anim-fortune-tube-container', '.anim-result-container'], { opacity: 0, scale: 1 })
    gsap.set(['.anim-result-fortune'], { opacity: 0, rotateZ: 45 })

    // Step 2 & 3: Create a GSAP timeline to animate the elements sequentially
    gsap
      .timeline({ defaults: { duration: 1, ease: 'power2.inOut' } })
      .to('.anim-fortune-tube-container', { opacity: 1 }) // Animate first container
      .to('.anim-fortune-tube', {
        rotationZ: -25,
        yoyo: true,
        repeat: 3,
        duration: 0.35,
        ease: 'power1.inOut',
      })
      .to('.anim-fortune-tube-container', { opacity: 0, scale: 0, duration: 0.4 })
      .to('.anim-result-container', { opacity: 1, duration: 0.35 }, '<=0.25')
      .fromTo('.anim-result-bg', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1 })
      .fromTo('.anim-result-smoke', { opacity: 0 }, { opacity: 1 })
      .fromTo(
        '.anim-result-fortune',
        { opacity: 0, rotateZ: 45 },
        { opacity: 1, rotateZ: 0, duration: 0.75 },
        '<0.5'
      )
      .fromTo(
        '.anim-result-text',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.75,
          onComplete: onAnimationComplete,
        },
        '<=0'
      )
  })

  const handleBackdropClick = useCallback(() => {
    if (animationDown) {
      transferResultToShowResult()
      setAnimationDown(false)
      setOpen(false)
    }
  }, [animationDown, setOpen, transferResultToShowResult])

  useEffect(() => {
    registerAnimationPlay(onPlayAnimation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={containerRef}
      className={clsx(
        'fixed top-0 left-0 w-full h-full',
        `z-[${BACKDROP_Z_INDEX_CONFIG.fortuneStickAnimation}]`,
        !open && 'invisible'
      )}
    >
      <div
        className={clsx(
          'w-full h-full bg-black/50 duration-200',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleBackdropClick}
      />
      {/* fortune tube animation */}
      <div className="anim-fortune-tube-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="anim-fortune-tube w-[150px] lg:w-[175px]">
          <Image
            src={'/images/fortune-stick/fortune-stick-01.png'}
            alt="fortune-stick"
            width={351}
            height={788}
            className="aspect-[351/788] w-full"
          />
        </div>
      </div>

      {/* result animation */}
      <div className="anim-result-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-[300px] lg:w-[435px]">
          <div className="relative w-full h-full overflow-hidden rounded-full">
            <Image
              src={'/images/fortune-stick/result-bg-01.png'}
              alt="result-bg"
              width={870}
              height={870}
              className="anim-result-bg aspect-square w-full relative z-0"
            />

            <div className="anim-result-smoke absolute top-1/2 -translate-y-1/2 left-0 z-10 w-[500px] scale-[1.1] lg:scale-[1.2] mix-blend-screen">
              <div
                className="aspect-[500/333] w-full animate-smoke-animation"
                style={{
                  backgroundImage: `url(/images/spritesheet/smoke-spritesheet.png)`,
                }}
              />
            </div>
          </div>

          <div className="absolute -bottom-[6px] left-[72px] z-10 w-[120px] lg:w-[200px]">
            <div className="anim-result-fortune">
              <Image
                src={'/images/fortune-stick/result-fortune-01.png'}
                alt="result-fortune"
                width={402}
                height={1116}
                className="aspect-[402/1116] w-full"
              />
            </div>
          </div>

          <div className="anim-result-text absolute top-[60px] right-[40px] lg:top-[120px] lg:right-[70px] z-10">
            <h4 className="text-dark-900 desktop-bold-number-2 text-center">{fortuneNo}</h4>
            <h5 className="text-dark-900 desktop-bold-number-2 text-center">{fortuneName}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(FortuneStickAnimationBackdrop)
