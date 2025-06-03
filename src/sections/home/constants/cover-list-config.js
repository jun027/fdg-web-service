import { PATHS } from '@/routes/page'

export const COVER_LIST_CONFIG = [
  {
    id: 1,
    label: '恆春郡福德宮',
    desktopBgImgUrl: '/images/cover/online-service-d-01.webp',
    mobileImgUrl: '/images/cover/online-service-m-01.webp',
    cardImgUrl: '/images/cover/online-service-card-01.webp',
    content:
      '「線上祈福 隨時感受平靜與祝福」<br />透過線上祈福，伴隨靜心音樂的舒緩旋律，為自己、家人或親友送上最誠摯的祝願。讓心靈沉澱，感受虔誠與平安的交融，共享溫暖與祥和。',
    buttonText: '線上祈福',
    buttonLink: PATHS.OnlinePrayer.path,
  },
  {
    id: 2,
    label: '安太歲',
    desktopBgImgUrl: '/images/cover/light-lamp-d-01.webp',
    mobileImgUrl: '/images/cover/light-lamp-m-01.webp',
    cardImgUrl: '/images/cover/light-lamp-card-01.webp',
    content:
      '「線上安太歲 化解煞氣保平安」<br />新一年即將到來，透過線上安太歲，為自己或家人祈求逢凶化吉、平安順遂。不論身處何地，都能虔誠上香，獲得福德正神的守護，安心迎接未來。',
    buttonText: '安太歲',
    buttonLink: PATHS.Service.child.LightingLamp.path,
  },
  {
    id: 3,
    label: '線上點燈',
    desktopBgImgUrl: '/images/cover/guangming-d-01.webp',
    mobileImgUrl: '/images/cover/guangming-m-01.webp',
    cardImgUrl: '/images/cover/guangming-card-01.webp',
    content:
      '「線上點燈祈福 照亮幸福人生」<br />提供光明燈、太歲燈、財利燈、福德燈、福壽燈五大祈福燈種，助您學業進步、事業騰飛、平安吉祥，延年益壽。即刻線上點燈，讓福氣與祥瑞常伴身邊！',
    buttonText: '線上點燈',
    buttonLink: PATHS.Service.child.Guangming.path,
  },
  {
    id: 4,
    label: '線上求籤',
    desktopBgImgUrl: '/images/cover/fortune-stick-d-01.webp',
    mobileImgUrl: '/images/cover/fortune-stick-m-01.webp',
    cardImgUrl: '/images/cover/fortune-stick-card-01.webp',
    content:
      '「線上求籤 解答心中疑惑」<br />透過線上求籤功能，輕鬆抽取每日運勢，感受神明的指引與啟發。還可解籤解析，了解籤文寓意，為生活指引方向，祈求平安順遂、心想事成！',
    buttonText: '線上求籤',
    buttonLink: PATHS.Service.child.FortuneStick.path,
  },
  {
    id: 5,
    label: '線上擲筊',
    desktopBgImgUrl: '/images/cover/divination-blocks-d-01.webp',
    mobileImgUrl: '/images/cover/divination-blocks-m-01.webp',
    cardImgUrl: '/images/cover/divination-blocks-card-01.webp',
    content:
      '「線上擲筊 神明指引與結緣祝福」<br />線上擲筊，不僅能虔心向神明請示，解答人生疑惑，還可獲得神明加持的結緣品，帶來平安與幸運，讓祈福更具意義，福氣隨身相伴！',
    buttonText: '線上擲筊',
    buttonLink: PATHS.Service.child.DivinationBlocks.path,
  },
]
