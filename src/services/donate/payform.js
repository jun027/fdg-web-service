import { donateAPI } from '@/apis/donate'

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
