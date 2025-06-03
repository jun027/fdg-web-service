import { create } from 'zustand'
import { produce } from 'immer'

export const useLightingLampFormContext = create((set, get) => ({
  service_list: [
    {
      item_id: 0,
      name: '',
      gender: '',
      birth: '',
      chinese_hour: '',
      city: '',
      area: '',
      address: '',
    },
  ],
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
        // servie_list
        draft.service_list = payload.service_list.map((service) => ({
          item_id: service.item_id,
          name: service.name,
          gender: service.gender,
          birth: service.birth,
          chinese_hour: service.chinese_hour,
          city: service.city,
          area: service.area,
          address: service.address,
        }))
        // payment
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
      // service_list
      service_list: get().service_list.map((service) => ({
        item_id: service.item_id,
        name: service.name,
        gender: service.gender,
        birth: service.birth,
        chinese_hour: service.chinese_hour,
        city: service.city,
        area: service.area,
        address: service.address,
      })),
      // payment
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
        // service_list
        draft.service_list = []
        // payment
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

export default useLightingLampFormContext
