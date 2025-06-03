import { memo, useCallback, useState } from 'react'
import { Dialog } from '@mui/material'
import Image from 'next/image'
import FormProvider from '@/components/hook-form/form-provider'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import RHFTextField from '@/components/hook-form/rhf-text-field'
import { useCopyAccount } from '@/hook/use-copy-account'
import { FaRegCopy } from 'react-icons/fa'
import { DONATE_ACCOUNT } from '@/constants/common'
import clsx from 'clsx'
import { POPUP_STEP_CONFIG } from '../constants/popup-step-config'

function WalletPaymentDialog({ open, amount = 0, onClose }) {
  const [curStep, setCurStep] = useState(POPUP_STEP_CONFIG.PAYMENT.value)
  const { handleCopyButtonClick } = useCopyAccount()

  const schema = z.object({
    account: z.string().trim().min(1, '此欄位不得為空').length(5, '需為帳戶後 5 碼'),
  })

  const defaultValues = {
    account: '',
  }

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmitButtonClick = useCallback(async (data) => {
    console.log('onSubmitButtonClick: ', data)
    setCurStep(POPUP_STEP_CONFIG.COMPLETE.value)
  }, [])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: 'px-4 py-6 rounded-2xl w-full flex flex-col items-center lg:px-8',
      }}
    >
      {/* Step - 1 */}
      <FormProvider
        className={clsx(
          'space-y-6 w-full',
          curStep !== POPUP_STEP_CONFIG.PAYMENT.value && 'hidden'
        )}
        methods={methods}
        onSubmit={handleSubmit(onSubmitButtonClick)}
      >
        <div className="space-y-4">
          <p className="text-dark-900 desktop-regular-h5 text-center">
            存款金額 <span className="desktop-bold-h5 text-red-600">{`$${amount}`}</span>
          </p>

          <Image
            src={'/images/qrcode-01.jpg'}
            alt="qrcode"
            width={300}
            height={300}
            className="aspect-square max-w-[150px] mx-auto"
          />
        </div>

        <div className="max-w-[230px] mx-auto lg:max-w-">
          <RHFTextField name="account" placeholder="請填寫帳戶後五碼" />
        </div>

        <div>
          <p className="text-center text-dark-900 desktop-regular-h6">銀行匯款帳戶</p>
          <div className="flex justify-center items-center gap-x-2">
            <button type="button" onClick={handleCopyButtonClick}>
              <FaRegCopy size={18} className="text-primary-800" />
            </button>
            <p
              role="button"
              className="desktop-regular-p text-dark-900 lg:desktop-regular-h6"
              onClick={handleCopyButtonClick}
            >
              {DONATE_ACCOUNT}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-x-[10px]">
          <button type="button" className="btn-outline flex-1 btn-hover py-3" onClick={onClose}>
            取消
          </button>
          <button type="submit" className="btn-solid flex-1 btn-hover py-3">
            確認
          </button>
        </div>
      </FormProvider>

      {/* Step - 2 */}
      <div className={clsx('space-y-6', curStep !== POPUP_STEP_CONFIG.COMPLETE.value && 'hidden')}>
        <h4 className="text-dark-900 desktop-regular-h6 text-center">感謝函</h4>
        <p className="text-dark-900 desktop-regular-p">
          謹此致上誠摯的感謝
          <br />
          <br />
          感謝您對恆春郡福德宮的慷慨捐款與支持！您的善心與無私奉獻不僅增添了我們宮廟的力量，也為社區帶來了福祉與祥和。我們的每一份努力，無不仰賴像您這樣有愛心的民眾共同支持，才能讓福德正神庇佑更多人、讓信仰與傳統得以弘揚。
          <br />
          <br />
          此次捐款將妥善運用於宮廟的日常運作與維護，也將用於推動更多社會公益活動，回饋社會並持續傳遞福德正神的祝福。我們深信，在各位信眾的支持下，恆春郡福德宮將能夠更加繁榮昌盛，繼續服務社區，守護大家的平安與幸福。
          <br />
          再次感謝您無私的捐助與支持，願福德正神保佑您闔家平安、健康順遂，心想事成。
          <br />
          <br />
          款項確認收到後，我們將於 3 至 7
          個工作日內完成核對程序，並將款項順利入帳至您的錢包，感謝您的耐心等候與支持。
          <br />
          <br />
          如有任何疑問，請隨時聯繫我們的客服(08-888-2122)。
        </p>
        <button className="btn-solid btn-hover w-full py-3" onClick={onClose}>
          關閉
        </button>
      </div>
    </Dialog>
  )
}

export default memo(WalletPaymentDialog)
