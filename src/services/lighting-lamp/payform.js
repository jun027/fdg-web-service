import { lightingLampAPI } from '@/apis/donate'

const lightingLampService = async (payload) => {
  try {
    const response = await lightingLampAPI(payload)

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default lightingLampService
