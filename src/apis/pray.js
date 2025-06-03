import { axs } from '@/utils/axios'

const prefix = '/pray'

const pray = {
  newPrayAPI: async (payload) => {
    const response = await axs(`${prefix}/newPray`, payload, 'POST')
    return response
  },
  getPrayAPI: async (payload) => {
    const response = await axs(`${prefix}/getPray`, payload, 'GET')
    return response
  },
}

export const { newPrayAPI, getPrayAPI } = pray
export default pray
