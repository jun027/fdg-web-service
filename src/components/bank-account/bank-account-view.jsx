'use client'

import { FaRegCopy } from 'react-icons/fa'
import { DONATE_ACCOUNT } from '@/constants/common'
import { useCopyAccount } from '@/hook/use-copy-account'

function BankAccountView() {
  const { handleCopyButtonClick } = useCopyAccount()

  return (
    <div className="flex flex-col items-start">
      <p className="desktop-regular-p text-dark-700 lg:desktop-regular-p">銀行匯款指定專用帳戶：</p>
      <div className="flex gap-x-2 items-center">
        <button type="button" onClick={handleCopyButtonClick}>
          <FaRegCopy size={16} className="text-primary-800" />
        </button>
        <p
          role="button"
          className="desktop-regular-p text-dark-900"
          onClick={handleCopyButtonClick}
        >
          {DONATE_ACCOUNT}
        </p>
      </div>
    </div>
  )
}

export default BankAccountView
