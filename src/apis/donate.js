import { axs } from '@/utils/axios'

const prefix = '/order'

const selectList = {
  lightingLampAPI: async (payload) => {
    const response = await axs(`${prefix}/lighting-lamp`, payload, 'POST')
    return response
  },
  guangmingAPI: async (payload) => {
    const response = await axs(`${prefix}/guangming`, payload, 'POST')
    return response
  },
  donateAPI: async (payload) => {
    const response = await axs(`${prefix}/donate`, payload, 'POST')
    return response
  },
  replenishAPI: async (payload) => {
    const response = await axs(`${prefix}/treasury`, payload, 'POST')
    return response
  },
}

export const { lightingLampAPI, guangmingAPI, donateAPI, replenishAPI } = selectList
export default selectList
