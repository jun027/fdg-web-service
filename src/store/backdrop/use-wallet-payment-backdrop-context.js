import { create } from 'zustand'

export const useWalletPaymentBackdropContext = create((set) => ({
  open: false,
  contentHtml: null,
  walletAmount: 0,
  setOpen: (open) => {
    set({ open: open })
  },
  setContentHtml: (contentHtml) => {
    set({ contentHtml: contentHtml })
  },
  setWalletAmount: (walletAmount) => {
    set({ walletAmount: walletAmount })
  },
}))

export default useWalletPaymentBackdropContext
