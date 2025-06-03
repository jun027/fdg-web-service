'use client'

import { memo } from 'react'
import { useWalletPaymentBackdropContext } from '@/store/backdrop/use-wallet-payment-backdrop-context'
import { Backdrop } from '@mui/material'
import { palette } from '@/style/config'
import { FaWallet } from 'react-icons/fa'
import Image from 'next/image'
import { BACKDROP_Z_INDEX_CONFIG } from './backdrop-zIndex-config'

function WalletPaymentBackdrop() {
  const { open } = useWalletPaymentBackdropContext()

  return (
    <Backdrop
      sx={() => ({ color: palette.common.white, zIndex: BACKDROP_Z_INDEX_CONFIG.walletPayment })}
      open={open}
    >
      {/* Check */}
      <div className="bg-white rounded-2xl w-[343px] overflow-hidden pt-8 pb-6 px-4 space-y-6">
        <p className="text-dark-900 mobile-regular-h4">
          「即將進行扣款確認」
          <br />
          感謝您使用擲筊遊戲。您正在進行的是付費擲筊遊戲。
          <br />
          本次服務將從您的錢包扣款 NT$68，您可進行 6 次擲筊。
          <br />
          請在確認後點擊「確認」以完成支付，或點擊「取消」來退出本次服務。
          <br />
          <br />
          小提醒：確認後將立即扣款。若有任何疑問，請隨時聯絡客服。
        </p>
        <p className="mobile-regular-h3 flex items-center gap-x-3 justify-center">
          <FaWallet className="text-primary-800 text-2xl" />
          <span className="text-primary-800">錢包餘額</span>
          <span className="text-red-600">$100</span>
        </p>
        <div className="flex flex-row gap-x-[10px]">
          <button className="text-primary-800 mobile-regular-h4 flex-1 btn-outline py-3 btn-hover">
            取消
          </button>
          <button className="text-white mobile-regular-h4 bg-primary-800 flex-1 btn-solid py-3 btn-hover">
            確認
          </button>
        </div>
      </div>

      {/* Success */}
      <div className="bg-white rounded-2xl w-[343px] overflow-hidden pt-8 pb-6 px-4 space-y-3">
        <Image
          src="/images/icons/success-01.png"
          alt="success"
          width={64}
          height={64}
          className="max-w-8 mx-auto"
        />
        <div className="space-y-6">
          <p className="text-dark-900 mobile-regular-h4">
            「感謝您的支持！此次扣款已完成，當前錢包餘額為：
            <span className="text-red-600 mobile-regular-h4">NT$32</span>。期待您再次使用！」
          </p>
          <div className="flex flex-row gap-x-[10px]">
            <button className="text-primary-800 mobile-regular-h4 flex-1 btn-outline py-3 btn-hover">
              取消
            </button>
            <button className="text-white mobile-regular-h4 bg-primary-800 flex-1 btn-solid py-3 btn-hover">
              確認
            </button>
          </div>
        </div>
      </div>

      {/* Fail */}
      <div className="bg-white rounded-2xl w-[343px] overflow-hidden pt-8 pb-6 px-4 space-y-3">
        <Image
          src="/images/icons/fail-01.png"
          alt="fail"
          width={64}
          height={64}
          className="max-w-8 mx-auto"
        />
        <div className="space-y-6">
          <p className="text-dark-900 mobile-regular-h4">
            「餘額不足」
            <br />
            抱歉，您的錢包餘額不足，無法完成此次支付。請先儲值再重試。
          </p>
          <p className="mobile-regular-h3 flex items-center gap-x-3 justify-center">
            <FaWallet className="text-primary-800 text-2xl" />
            <span className="text-primary-800">錢包餘額</span>
            <span className="text-red-600">$30</span>
          </p>
          <div className="flex flex-row gap-x-[10px]">
            <button className="text-primary-800 mobile-regular-h4 flex-1 btn-outline py-3 btn-hover">
              取消
            </button>
            <button className="text-white mobile-regular-h4 bg-primary-800 flex-1 btn-solid py-3 btn-hover">
              確認
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  )
}

export default memo(WalletPaymentBackdrop)
