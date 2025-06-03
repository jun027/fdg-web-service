import { updateInfoAPI } from '@/apis/member'

const updateMemberInfoService = async (payload) => {
  try {
    const response = await updateInfoAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default updateMemberInfoService
