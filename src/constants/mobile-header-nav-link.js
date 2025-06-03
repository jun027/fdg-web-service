import { PATHS } from '@/routes/page'

export const MOBILE_HEADER_NAV_LINKS = [
  {
    title: PATHS.OnlinePrayer.title,
    link: PATHS.OnlinePrayer.path,
    enabled: true,
    child: [],
  },
  {
    title: PATHS.Service.child.LightingLamp.title,
    link: PATHS.Service.child.LightingLamp.path,
    enabled: true,
    child: [],
  },
  {
    title: '線上點燈',
    link: PATHS.Service.child.Guangming.path,
    enabled: true,
    child: [],
  },
  {
    title: PATHS.Service.child.FortuneStick.title,
    link: PATHS.Service.child.FortuneStick.path,
    enabled: true,
    child: [],
  },
  {
    title: PATHS.Service.child.DivinationBlocks.title,
    link: PATHS.Service.child.DivinationBlocks.path,
    enabled: true,
    child: [],
  },
]
