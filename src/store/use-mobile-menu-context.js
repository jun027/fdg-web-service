import { create } from 'zustand'

export const useMobileMenuContext = create((set) => ({
  open: false,
  setOpen: (open) => {
    set({ open: open })
  },
}))

export default useMobileMenuContext
