import { create } from 'zustand'
import { produce } from 'immer'

export const useReplenishFormContext = create((set, get) => ({
  service_list: {
    amount: 0,
    activity_name: '', 
    name: '', 
    gender: '', 
    birth: '',
    chinese_hour: '', 
  },
  payform: {
    name: '', 
    phone: '', 
    email: '', 
    city: '', 
    area: '', 
    address: '', 
    receipt_type: 0, 
    receipt_extra: {
      receipt_title: '',
      receipt_city: '',
      receipt_area: '',
      receipt_address: '',
      receipt_email: '',
    },
    pay_type: 0, 
    pay_extra: {
      bank_5last: '', 
    },
  },

  storeFormData: (payload) => {
    set(
      produce((draft) => {
        draft.service_list.amount = payload.service_list.amount
        draft.service_list.activity_name = payload.service_list.activity_name
        draft.service_list.name = payload.service_list.name
        draft.service_list.gender = payload.service_list.gender
        draft.service_list.birth = payload.service_list.birth
        draft.service_list.chinese_hour = payload.service_list.chinese_hour

        draft.payform.name = payload.payform.name
        draft.payform.phone = payload.payform.phone
        draft.payform.email = payload.payform.email
        draft.payform.city = payload.payform.city
        draft.payform.area = payload.payform.area
        draft.payform.address = payload.payform.address
        draft.payform.receipt_type = payload.payform.receipt_type
        draft.payform.receipt_extra = payload.payform.receipt_extra
        draft.payform.pay_type = payload.payform.pay_type
        draft.payform.pay_extra = payload.payform.pay_extra
      })
    )
  },

  getData: () => {
    const payform = get().payform
    const receipt_extra = payform.receipt_extra || {}
    const pay_extra = payform.pay_extra || {}

    return {
      service_list: {
        amount: get().service_list.amount,
        activity_name: get().service_list.activity_name,
        name: get().service_list.name,
        gender: get().service_list.gender,
        birth: get().service_list.birth,
        chinese_hour: get().service_list.chinese_hour,
      },
      payform: {
        name: payform.name,
        phone: payform.phone,
        email: payform.email,
        city: payform.city,
        area: payform.area,
        address: payform.address,
        receipt_type: payform.receipt_type,
        receipt_extra: {
          receipt_title: receipt_extra.receipt_title || '',
          receipt_city: receipt_extra.receipt_city || '',
          receipt_area: receipt_extra.receipt_area || '',
          receipt_address: receipt_extra.receipt_address || '',
          receipt_email: receipt_extra.receipt_email || '',
        },
        pay_type: payform.pay_type,
        pay_extra: {
          bank_5last: pay_extra.bank_5last || '',
        },
      },
    }
  },

  clearData: () => {
    set(
      produce((draft) => {
        draft.service_list.amount = 0
        draft.service_list.activity_name = ''
        draft.service_list.name = ''
        draft.service_list.gender = ''
        draft.service_list.birth = ''
        draft.service_list.chinese_hour = ''

        draft.payform.name = ''
        draft.payform.phone = ''
        draft.payform.email = ''
        draft.payform.city = ''
        draft.payform.area = ''
        draft.payform.address = ''
        draft.payform.receipt_type = 0
        draft.payform.receipt_extra = {
          receipt_title: '',
          receipt_city: '',
          receipt_area: '',
          receipt_address: '',
          receipt_email: '',
        }
        draft.payform.pay_type = 0
        draft.payform.pay_extra = {
          bank_5last: '',
        }
      })
    )
  },
}))

export default useReplenishFormContext
