import { newPrayAPI } from '@/apis/pray'

const newPrayService = async (payload) => {
  try {
    const response = await newPrayAPI(payload)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default newPrayService
