import { PATHS } from '@/routes/page'

export const FOOTER_LIST = [
  {
    id: 1,
    title: '首頁',
    child: [
      {
        id: 1,
        title: '關於我們',
        path: `${PATHS.Home.path}#about-us`,
      },
      {
        id: 2,
        title: '最新活動',
        path: PATHS.Activity.child.Announcement.path,
      },
      {
        id: 4,
        title: '土地公',
        path: `${PATHS.Home.path}#donate`,
      },
      {
        id: 5,
        title: '相關產業',
        path: `${PATHS.Home.path}#related-industries`,
      },
    ],
  },
  {
    id: 2,
    title: '線上服務',
    child: [
      {
        id: 1,
        title: '祈福',
        path: PATHS.OnlinePrayer.path,
      },
      {
        id: 2,
        title: '安太歲',
        path: PATHS.Service.child.LightingLamp.path,
      },
      {
        id: 3,
        title: '線上點燈',
        path: PATHS.Service.child.Guangming.path,
      },
      {
        id: 4,
        title: '求籤',
        path: PATHS.Service.child.FortuneStick.path,
      },
      {
        id: 5,
        title: '擲筊',
        path: PATHS.Service.child.DivinationBlocks.path,
      },
    ],
  },
  {
    id: 5,
    title: '加入會員',
    child: [
      {
        id: 1,
        title: '線上註冊',
        path: PATHS.Auth.child.SignUp.path,
      },
      {
        id: 2,
        title: '會員中心',
        path: PATHS.User.child.Profile.path,
      },
    ],
  },
  {
    id: 6,
    title: '慈善捐款',
    child: [],
  },
]
