'use client'

import Image from 'next/image'
import { FaTools } from 'react-icons/fa'

function NotWork() {
  return (
    <div className="bg-white max-w-650 rounded-2xl py-[86px] space-y-3 lg:max-w-[739px] lg:mx-auto">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <FaTools className="text-secondary-600 text-xl lg:text-2xl" />
        <p className="text-secondary-600 desktop-regular-h5 lg:desktop-regular-h4">頁面施工中</p>
      </div>
      <Image
        src={'/images/god-of-wealth-02.png'}
        alt="God of Wealth"
        width={305}
        height={552}
        className="aspect-[152/276] max-w-[152px] mx-auto"
      />
    </div>
  )
}

// function Work() {
//   const [progress, setProgress] = useState(25)
//   const [level, setLevel] = useState(1)

//   return (
//     <div className="px-4 py-6 bg-white rounded-2xl space-y-8 lg:p-6">
//       <div className="space-y-[10px]">
//         <h2 className="desktop-regular-h5 text-primary-800 text-center">功德卡</h2>

//         <div className="relative bg-primary-500 rounded-lg aspect-[270/182] max-w-[270px] mx-auto overflow-hidden">
//           {/* Level */}
//           <div className="absolute z-10 flex flex-col justify-center items-center top-1/2 -translate-y-1/2 left-[18px] bg-white rounded-full aspect-square w-[112px]">
//             <span className="desktop-regular-h6 text-black">等級</span>
//             <span className="desktop-regular-h4 text-black">{level}</span>
//           </div>

//           {/* God Image */}
//           <Image
//             className="absolute z-0 top-1/2 -translate-y-1/2 right-2 w-[123px]"
//             src={'/images/god-of-wealth-01.png'}
//             alt="God of Wealth"
//             width={247}
//             height={364}
//           />
//         </div>

//         <p className="desktop-regular-p text-dark-900 text-center">距離升等還差 $1,688</p>

//         {/* Progress Bar */}
//         <div className="relative overflow-hidden rounded-full max-w-[270px] mx-auto bg-dark-200 w-full h-[6px]">
//           <div
//             className="absolute z-10 top-0 left-0 h-full w-full duration-200"
//             style={{
//               transform: `translateX(${progress}%)`,
//             }}
//           >
//             <p className="absolute w-full h-full top-0 left-0 z-0 bg-primary-500 -translate-x-full rounded-full" />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-3">
//         <p className="desktop-regular-p text-dark-900">
//           活動規則：
//           <br />
//           功德卡是一項專門為捐獻會員設計的功能，目的是讓每一位有捐獻的會員感受到認同與尊重。會員根據他們的捐獻金額會被分級，而不同的級別則對應於我們旗下各個產業的專屬優惠與權益。
//           <br />
//           這些包括：
//           <br />
//           折扣優惠：會員可以根據功德卡的等級，享受不同產業的消費折扣，這是一種感謝會員長期支持的方式。
//           <br />
//           活動優先參與權：高級別會員可以優先參加我們所舉辦的各類活動，如法會、講座等，讓他們能更深入參與我們的寺廟活動。
//         </p>

//         <p className="desktop-regular-p text-dark-700">目前累積金額：$300</p>
//       </div>

//       <div className="flex justify-center items-center">
//         <Link
//           className="inline-block w-full max-w-[233px] mobile-regular-h3 text-white p-4 rounded-full bg-primary-800 text-center btn-hover lg:desktop-regular-h5 lg:max-w-[256px]"
//           href={PATHS.Home.path}
//         >
//           我要捐款
//         </Link>
//       </div>
//     </div>
//   )
// }

function MeritCardView() {
  return <NotWork />
}

export default MeritCardView
