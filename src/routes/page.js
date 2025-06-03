import { path } from 'ramda'
import { GoHome } from 'react-icons/go'

const ASSETS = {
  Home: {
    title: '首頁',
    path: '/',
    icon: GoHome,
  },
}

export const PATHS = {
  Home: {
    title: ASSETS.Home.title,
    path: ASSETS.Home.path,
    subTitle: 'Home',
  },
  Auth: {
    title: '會員中心',
    path: '/auth',
    subTitle: 'Auth',
    child: {
      Login: {
        title: '會員登入',
        path: '/auth/login',
        subTitle: 'Login',
      },
      SignUp: {
        title: '會員註冊',
        path: '/auth/signup',
        subTitle: 'SignUp',
      },
      ForgotPassword: {
        title: '忘記密碼',
        path: '/auth/forgot-password',
        sutTitle: 'Forgot Password',
        child: {
          Request: {
            title: '忘記密碼',
            path: '/auth/forgot-password/request',
            subTitle: 'Forgot Password Request',
          },
          Confirm: {
            title: '忘記密碼',
            path: '/auth/forgot-password/confirm',
            subTitle: 'Forgot Password Confirm',
          },
        },
      },
    },
  },
  Service: {
    title: '線上服務',
    path: '/service',
    subTitle: 'Online Service',
    Donate: {
      child: {
        Payment: {
          title: '線上捐款',
          path: '/service/donatepay',
          subTitle: 'Donate',
        },
      },
    },
    Replenish: {
      child: {
        Payment: {
          title: '補財庫',
          path: '/service/replenishpay',
          subTitle: 'Replenish',
        },
      },
    },
    child: {
      Donate: {
        title: '線上捐款',
        path: '/service/donate',
        subTitle: 'Donate',
      },
      DonatePay: {
        title: '線上捐款',
        path: '/service/donatepay',
        subTitle: 'Donate Pay',
      },
      DonateComplete: {
        title: '線上捐款完成',
        path: '/service/donatecomplete',
        subTitle: 'Donate Complete',
      },
      LightingLamp: {
        title: '安太歲',
        path: '/service/lighting-lamp',
        subTitle: 'Lighting Lamp',
      },
      Guangming: {
        title: '光明燈',
        path: '/service/guangming',
        subTitle: 'Guangming',
      },
      FortuneStick: {
        title: '線上求籤',
        path: '/service/fortune-stick',
        subTitle: 'Fortune Stick',
      },
      DivinationBlocks: {
        title: '線上擲筊',
        path: '/service/divination-blocks',
        subTitle: 'Divination Blocks',
      },
      Replenish: {
        title: '補財庫',
        path: '/service/replenish',
        subTitle: 'Replenish',
      },
      ReplenishPay: {
        title: '補財庫',
        path: '/service/replenishpay',
        subTitle: 'Replenish Pay',
      },
      ReplenishComplete: {
        title: '補財庫完成',
        path: '/service/replenishcomplete',
        subTitle: 'Replenish Complete',
      },
      Complete: {
        title: '完成訂單',
        path: '/service/donatecomplete',
        subTitle: 'Donate Complete',
      },
    },
  },

  Activity: {
    title: '活動專區',
    path: '/activity',
    subTitle: 'Activity',
    child: {
      Announcement: {
        title: '最新活動公告內容',
        path: '/activity/announcement',
        subTitle: 'Announcement',
        child: {
          Article: {
            title: '文章',
            path: '/activity/announcement/article',
            subTitle: 'Article',
          },
        },
      },
    },
  },
  User: {
    title: '會員中心',
    path: '/user',
    subTitle: 'User',
    child: {
      Profile: {
        title: '會員專區',
        path: '/user/profile',
        subTitle: 'Profile',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '會員資料',
          },
        ],
      },
      DonateRecord: {
        title: '會員專區',
        path: '/user/donate-record',
        subTitle: 'Donate Record',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '祈福紀錄',
          },
        ],
      },
      DepositRecord: {
        title: '會員專區',
        path: '/user/deposit-record',
        subTitle: 'Deposit Record',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '存款紀錄',
          },
        ],
      },
      MeritCard: {
        title: '會員專區',
        path: '/user/merit-card',
        subTitle: 'Merit Card',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '功德卡',
          },
        ],
      },
      FortuneStick: {
        title: '會員專區',
        path: '/user/fortune-stick',
        subTitle: 'Fortune Stick',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '籤詩',
          },
        ],
      },
      DivinationBlocks: {
        title: '會員專區',
        path: '/user/divination-blocks',
        subTitle: 'Divination Blocks',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '擲筊',
          },
        ],
      },
      Wallet: {
        title: '會員專區',
        path: '/user/wallet',
        subTitle: 'Wallet',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '我的錢包',
          },
        ],
      },
    },
  },
  OnlinePrayer: {
    title: '線上祈福',
    path: '/online-prayer',
    subTitle: 'Online Prayer',
  },
}
