import { PATHS } from '@/routes/page'
import Image from 'next/image'
import Link from 'next/link'

function DonatecompleteView() {
  return (
    <div className="py-6 lg:py-12 flex items-center justify-center bg-background ">
      <div className="bg-white py-6 px-4 rounded-2xl w-full lg:w-[1120px]">
        {/* 步驟條 */}
        <div className="flex items-center justify-center gap-x-2 sm:gap-x-3 pb-6 max-w-full mx-auto whitespace-nowrap">
          <div className="flex flex-col items-center">
            <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-white bg-primary-500 mobile-bold-h3 lg:desktop-regular-h4">
              1
            </div>
            <span className="mt-2 text-primary-500 mobile-medium-h4">填寫資料</span>
          </div>

          <div className="text-primary-500 pb-10 flex gap-x-1 sm:gap-x-3">
            <span className="text-sm sm:text-base font-bold">_</span>
            <span className="text-sm sm:text-base font-bold">__</span>
            <span className="text-sm sm:text-base font-bold">__</span>
            <span className="text-sm sm:text-base font-bold">_</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-white bg-primary-500 mobile-bold-h3 lg:desktop-regular-h4">
              2
            </div>
            <span className="mt-2 text-primary-500 desktop-bold-p">支付金額</span>
          </div>

          <div className="text-primary-500 pb-10 flex gap-x-1 sm:gap-x-3">
            <span className="text-sm sm:text-base font-bold">_</span>
            <span className="text-sm sm:text-base font-bold">__</span>
            <span className="text-sm sm:text-base font-bold">__</span>
            <span className="text-sm sm:text-base font-bold">_</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[35px] h-[35px] sm:w-[43px] sm:h-[43px] lg:w-[55px] lg:h-[55px] flex items-center justify-center rounded-full text-white bg-primary-500 mobile-bold-h3 lg:desktop-bold-h4">
              3
            </div>
            <span className="mt-2 text-primary-500 desktop-bold-p">感謝函</span>
          </div>
        </div>

        <div className="space-y-9 flex flex-col justify-center items-center">
          <p className="mobile-regular-h3 text-dark-900 lg:desktop-regular-h5 lg:w-[930px]">
            親愛的信眾，您好：
            <br />
            <br />
            感謝您對恆春郡福德宮的無私捐獻！您的善心與愛心不僅為我們的工作提供了寶貴的支持，也將為無數有需要的人帶來希望與幫助。每一筆捐款都是我們持續推動公益活動的重要動力，您的慷慨解囊讓我們更有信心完成使命。
            <br />
            我們深知，這份愛心將在未來的日子裡，化作實際的行動，讓更多的弱勢族群受益。再次感謝您對我們的信任與支持，願福報與您同在，讓善的循環不斷延續。
            <br />
            <br />
            誠摯的祝福， [恆春郡福德宮]
          </p>

          <Image
            width={500}
            height={500}
            src="/images/FDG-logo.png"
            alt="logo"
            className="w-[250px] mx-auto lg:w-[250px]"
          />

          <div className="flex justify-center items-center">
            <Link
              className="btn-solid btn-hover w-[192px] desktop-regular-h6 py-4"
              href={PATHS.Home.path}
              target="_self"
            >
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonatecompleteView
