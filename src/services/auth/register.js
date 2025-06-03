import { registerAPI } from '@/apis/auth'

const registerService = async (payload) => {
  try {
    const response = await registerAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default registerService
