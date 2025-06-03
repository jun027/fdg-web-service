import packageJson from '../package.json'
import { PATHS } from './routes/page'

export const CONFIG = {
  appName: '恆春郡福德宮',
  appDescription: `歡迎來到恆春郡網站，這座擁有超過四百五十年歷史的悠久寶地。恆春郡自創立以來，經歷多代修繕與守護，成為南台灣信仰文化的重要地標。這裡不僅是信眾膜拜的神聖之地，更是傳承地方文化與歷史的中心。無論是祈福還是參加盛大的慶典活動，恆春郡始終秉持著尊重與愛護之心，歡迎每一位到訪的來客一同感受這片土地的深厚底蘊與人文故事。`,
  appVersion: packageJson.version,
  address: '屏東縣恆春鎮城西里福德路126號',
  phone: '08-8891596',
  serviceLine: 'https://lin.ee/LAwIykY',
  socialMedia: {
    facebookUrl: 'https://www.facebook.com/share/g/129s1rkeZDq/?mibextid=K35XfP',
  },
  auth: {
    redirectPath: PATHS.Home.path,
  },
}
