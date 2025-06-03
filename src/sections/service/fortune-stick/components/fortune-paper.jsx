import clsx from 'clsx'
import { memo } from 'react'

function FortunePaper({ show = false, title, body, content, onButtonClick }) {
  return (
    <div
      className="max-w-[317px] mx-auto rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-8 h-[485px] lg:w-[295px] lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2"
      style={{
        backgroundImage: `url('/images/paper-01.jpg')`,
      }}
    >
      <div
        className={clsx('flex flex-col gap-y-6 h-full', !show && 'pointer-events-none opacity-0')}
      >
        <div>
          <p className="text-dark-900 desktop-bold-number-2">{title}</p>
          <p
            className="text-dark-900 desktop-bold-number-1"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <p
            className="text-dark-900 desktop-bold-number-1"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {/* <div>
          <button
            className="bg-secondary-600 rounded-4 text-white desktop-regular-h6 p-2 w-full btn-hover"
            onClick={onButtonClick}
          >
            付費解簽詩
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default memo(FortunePaper)
