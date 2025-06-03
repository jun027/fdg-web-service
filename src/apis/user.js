import { axs } from '@/utils/axios'

const prefix = '/member'

export const donateHistoryAPI = async (payload) => {
    const response = await axs(`${prefix}/history`, payload, 'POST')
    return response
  }
