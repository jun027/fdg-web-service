import { axs } from '@/utils/axios'

const prefix = '/auth'

const auth = {
  loginAPI: async (payload) => {
    const response = await axs(`${prefix}/login`, payload, 'POST')
    return response
  },
  registerAPI: async (payload) => {
    const response = await axs(`${prefix}/register`, payload, 'POST')
    return response
  },
  logoutAPI: async () => {
    const response = await axs(`${prefix}/logout`, null, 'POST')
    return response
  },
  resetMailAPI: async (payload) => {
    const response = await axs(`${prefix}/resetmail`, payload, 'POST')
    return response
  },
  resetAPI: async (payload) => {
    const response = await axs(`${prefix}/reset`, payload, 'POST')
    return response
  },
}

export const { loginAPI, registerAPI, logoutAPI, resetMailAPI, resetAPI } = auth
export default auth
