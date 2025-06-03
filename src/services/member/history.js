import { historyAPI } from '@/apis/member'

const getMemberHistoryService = async (payload) => {
  try {
    const response = await historyAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getMemberHistoryService
