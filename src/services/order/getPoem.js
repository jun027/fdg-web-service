import { getPoemAPI } from '@/apis/order'

const getPoemService = async () => {
  try {
    const response = await getPoemAPI()
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getPoemService
