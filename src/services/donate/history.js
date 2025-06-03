import { historyAPI } from '@/apis/donate'

const historyService = async (payload) => {
  try {
    const response = await historyAPI(payload)

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default historyService
