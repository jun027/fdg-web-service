import { donateAPI } from '@/apis/order'

const donateService = async (payload) => {
  try {
    const response = await donateAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default donateService
