import { getThrowJiaoAPI } from '@/apis/order'

const getThrowJiaoService = async () => {
  try {
    const response = await getThrowJiaoAPI()
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getThrowJiaoService
