import { replenishAPI } from '@/apis/donate'

const replenishService = async (payload) => {
  try {
    const response = await replenishAPI(payload)

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default replenishService
