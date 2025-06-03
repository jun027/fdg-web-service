import { logoutAPI } from '@/apis/auth'

const logoutService = async () => {
  try {
    const response = await logoutAPI()

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default logoutService
