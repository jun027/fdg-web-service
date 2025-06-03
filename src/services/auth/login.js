import { loginAPI } from '@/apis/auth'
import { setSession } from '@/auth/context/utils'

const loginService = async (payload) => {
  try {
    const { data: jwtToken } = await loginAPI(payload)

    setSession(jwtToken)

    return jwtToken
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default loginService
