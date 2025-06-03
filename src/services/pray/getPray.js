import { getPrayAPI } from '@/apis/pray'

const getPrayService = async (payload) => {
  try {
    const response = await getPrayAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getPrayService
