import { create } from 'zustand'

export const useLoadingBackdropContext = create((set) => ({
  loading: false,
  setLoading: (loading) => {
    set({ loading: loading })
  },
}))

export default useLoadingBackdropContext
