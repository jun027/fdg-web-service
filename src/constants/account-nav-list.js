import { PATHS } from '@/routes/page'

import { IoPerson } from 'react-icons/io5'
import { TbReportAnalytics } from 'react-icons/tb'

export const ACCOUNT_NAV_LIST = [
  // * headerOrder 用在登入後，一般會員 hover 後的下拉選單順序
  {
    title: '會員資料',
    link: PATHS.User.child.Profile.path,
    icon: IoPerson,
    child: [],
    enable: true,
  },
  {
    title: '祈福紀錄',
    link: PATHS.User.child.DonateRecord.path,
    icon: TbReportAnalytics,
    child: [],
    enable: true,
  },
  {
    title: '存款紀錄',
    link: PATHS.User.child.DepositRecord.path,
    icon: TbReportAnalytics,
    child: [],
    enable: false,
  },
  {
    title: '功德卡',
    link: PATHS.User.child.MeritCard.path,
    icon: TbReportAnalytics,
    child: [],
    enable: true,
  },
  {
    title: '籤詩',
    link: PATHS.User.child.FortuneStick.path,
    icon: TbReportAnalytics,
    child: [],
    enable: false,
  },
  {
    title: '擲筊',
    link: PATHS.User.child.DivinationBlocks.path,
    icon: TbReportAnalytics,
    child: [],
    enable: false,
  },
  {
    title: '我的錢包',
    link: PATHS.User.child.Wallet.path,
    child: [],
    enable: false,
  },
]
