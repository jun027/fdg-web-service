import clsx from 'clsx'
import Image from 'next/image'
import { memo } from 'react'

function RelatedIndustriesCard({ imageUrl, title, width, height }) {
  return (
    <div
      className={clsx(
        'rounded-4 overflow-hidden py-6 space-y-[10px] flex flex-col justify-center items-center h-full',
        imageUrl ? 'bg-white' : 'bg-dark-200'
      )}
    >
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt={title}
            width={width}
            height={height}
            className="aspect-[139/88] w-full"
          />
          <p className="desktop-regular-h6 text-dark-900 text-center">{title}</p>
        </>
      )}
      {!imageUrl && (
        <div className="h-full flex justify-center items-center">
          <p className="desktop-regular-h6 text-dark-500 text-center">{title}</p>
        </div>
      )}
    </div>
  )
}

export default memo(RelatedIndustriesCard)
