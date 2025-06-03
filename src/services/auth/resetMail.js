import { resetMailAPI } from '@/apis/auth'

const resetMailService = async (payload) => {
  try {
    const response = await resetMailAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default resetMailService
