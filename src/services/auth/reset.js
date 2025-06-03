import { resetAPI } from '@/apis/auth'

const resetService = async (payload) => {
  try {
    const response = await resetAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default resetService
