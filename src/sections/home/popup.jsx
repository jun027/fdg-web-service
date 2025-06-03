'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Popup = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex flex-col items-center justify-center z-50 px-4 lg:py-0 lg:px-0">
      {/* 主容器，包含背景和內容 */}
      <div
        className="relative lg:w-[580px] w-[320px] lg:h-[654px] h-[361px] bg-cover rounded-lg overflow-hidden"
        style={{ backgroundImage: "url('/images/bg-popup-01.png')" }}
      >
        {/* 主圖片 */}
        <div className="flex justify-center lg:mt-[112px] mt-[61px]">
          <Image
            src="/images/bg-popup-02.png"
            alt="主圖"
            width={1064}
            height={606}
            className="rounded w-[276px] h-[150px] lg:w-[502px] lg:h-[273px]"
          />
        </div>

        {/* 中心文字與按鈕 */}
        <div className="text-center mt-[13px] lg:mt-6 px-5 lg:px-0">
          <h2 className="mobile-regular-h4 lg:desktop-bold-h4 text-white">「正月初九，補財庫」</h2>
          <p className="mobile-regular-h5 lg:desktop-regular-h6 text-white mt-[13px] lg:mt-6">
            向財神和神明敬獻金紙和文疏，消除災厄、獲得幸福、增加財運。
          </p>
          <Link href="/service/replenish" passHref>
            <button
              onClick={onNavigate}
              className="mt-4 lg:mt-8 mobile-regular-h5 lg:desktop-regular-h6 bg-opacity-25 bg-white text-white px-12 py-1.5 lg:px-24 lg:py-3 rounded-full border border-white hover:bg-red-600"
            >
              點我查看
            </button>
          </Link>
        </div>

        {/* 裝飾圖案 */}
        <div className="absolute top-0 left-0 px-2 py-2 lg:px-4 lg:py-4">
          <Image
            src="/images/deco/conner-02.png"
            alt="左上角裝飾"
            width={129}
            height={131}
            className="aspect-square w-[33px] lg:w-[61px]"
          />
        </div>
        <div className="absolute top-0 right-0 -scale-x-100 px-2 py-2 lg:px-4 lg:py-4">
          <Image
            src="/images/deco/conner-02.png"
            alt="右上角裝飾"
            width={129}
            height={131}
            className="aspect-square w-[33px] lg:w-[61px]"
          />
        </div>
        <div className="absolute bottom-0 left-0 -scale-y-100 px-2 py-2 lg:px-4 lg:py-4">
          <Image
            src="/images/deco/conner-02.png"
            alt="左下角裝飾"
            width={129}
            height={131}
            className="aspect-square w-[33px] lg:w-[61px]"
          />
        </div>
        <div className="absolute bottom-0 right-0 -scale-x-100 -scale-y-100 px-2 py-2 lg:px-4 lg:py-4">
          <Image
            src="/images/deco/conner-02.png"
            alt="右下角裝飾"
            width={129}
            height={131}
            className="aspect-square w-[33px] lg:w-[61px]"
          />
        </div>
      </div>

      <button onClick={onClose} className="mt-3 lg:mt-6">
        <Image
          src="/images/icons/close.svg"
          alt="close"
          width={45}
          height={44}
          className="aspect-square w-[24px] lg:w-[45px]"
        />
      </button>
    </div>
  )
}

export default Popup
