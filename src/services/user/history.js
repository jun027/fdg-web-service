import { donateHistoryAPI } from '@/apis/user'

const donateHistoryService = async (payload) => {
  try {
    const response = await donateHistoryAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default donateHistoryService
