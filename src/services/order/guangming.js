import { guangmingAPI } from '@/apis/order'

const guangmingService = async (payload) => {
  try {
    const response = await guangmingAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default guangmingService
