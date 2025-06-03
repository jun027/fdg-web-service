import { PATHS } from '@/routes/page'
import { BsPersonFill } from 'react-icons/bs'
import { ACCOUNT_NAV_LIST } from './account-nav-list'

export const MENU_LIST_DESKTOP = [
  {
    title: PATHS.Home.title,
    path: PATHS.Home.path,
    enable: true,
  },
  {
    title: '線上服務',
    enable: true,
    child: [
      {
        title: PATHS.OnlinePrayer.title,
        path: PATHS.OnlinePrayer.path,
        enable: true,
      },
      {
        title: PATHS.Service.child.LightingLamp.title,
        path: PATHS.Service.child.LightingLamp.path,
        enable: true,
      },
      {
        title: '線上點燈',
        path: PATHS.Service.child.Guangming.path,
        enable: true,
      },
      {
        title: PATHS.Service.child.FortuneStick.title,
        path: PATHS.Service.child.FortuneStick.path,
        enable: true,
      },
      {
        title: PATHS.Service.child.DivinationBlocks.title,
        path: PATHS.Service.child.DivinationBlocks.path,
        enable: true,
      },
    ],
  },
  {
    title: '平安商城',
    enable: false,
  },
  {
    title: '慈善捐款',
    path: PATHS.Service.child.Donate.path,
    enable: true,
  },
]

export const MENU_LIST_MOBILE = [
  {
    title: '會員中心',
    icon: BsPersonFill,
    enable: true,
    child: [
      {
        title: ACCOUNT_NAV_LIST[0].title,
        path: ACCOUNT_NAV_LIST[0].link,
        enable: ACCOUNT_NAV_LIST[0].enable,
      },
      {
        title: ACCOUNT_NAV_LIST[1].title,
        path: ACCOUNT_NAV_LIST[1].link,
        enable: ACCOUNT_NAV_LIST[1].enable,
      },
      {
        title: ACCOUNT_NAV_LIST[2].title,
        path: ACCOUNT_NAV_LIST[2].link,
        enable: ACCOUNT_NAV_LIST[2].enable,
      },
      {
        title: ACCOUNT_NAV_LIST[3].title,
        path: ACCOUNT_NAV_LIST[3].link,
        enable: ACCOUNT_NAV_LIST[3].enable,
      },
      {
        title: ACCOUNT_NAV_LIST[4].title,
        path: ACCOUNT_NAV_LIST[4].link,
        enable: ACCOUNT_NAV_LIST[4].enable,
      },
      {
        title: ACCOUNT_NAV_LIST[5].title,
        path: ACCOUNT_NAV_LIST[5].link,
        enable: ACCOUNT_NAV_LIST[5].enable,
      },
      {
        title: ACCOUNT_NAV_LIST[6].title,
        path: ACCOUNT_NAV_LIST[6].link,
        enable: ACCOUNT_NAV_LIST[6].enable,
      },
    ],
  },
]
