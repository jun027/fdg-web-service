import { getInfoAPI, getStatusAPI } from '@/apis/member'

const getMemberInfoService = async () => {
  try {
    const { data: memberInfo } = await getInfoAPI()
    const { data: statusInfo } = await getStatusAPI()

    return { memberInfo, statusInfo }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getMemberInfoService
