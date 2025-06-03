import { axs } from '@/utils/axios'

const prefix = '/order'

const order = {
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
  getPoemAPI: async () => {
    const response = await axs(`${prefix}/poem`, null, 'GET')
    return response
  },
  getThrowJiaoAPI: async () => {
    const response = await axs(`${prefix}/throw-jiao`, null, 'GET')
    return response
  },
}

export const { lightingLampAPI, guangmingAPI, donateAPI, getPoemAPI, getThrowJiaoAPI, replenishAPI } = order
export default order
