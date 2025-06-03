import { PATHS } from '@/routes/page'
import Link from 'next/link'

function CompleteView() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white px-4 py-6 lg:px-8 rounded-2xl space-y-6 w-[343px] lg:w-[596px]">
        <h2 className="text-center desktop-regular-h6 text-dark-900 ">感謝函</h2>
        <p className="desktop-regular-p text-dark-900 ">
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
          款項確認收到後，我們將於 3 至 7 個工作日內完成核對程序，並將款項順利入帳至您的錢包，感謝您的耐心等候與支持。
          <br />
          <br />
          如有任何疑問，請隨時聯繫我們的客服 (08-888-2122)。
        </p>

        <Link
          className="btn-solid btn-hover block w-full desktop-regular-p py-3 px-4 bg-primary-800 rounded text-white"
          href={PATHS.Home.path}
          target="_self"
        >
          關閉
        </Link>
      </div>
    </div>
  )
}

export default CompleteView
