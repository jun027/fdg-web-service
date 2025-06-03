import { create } from 'zustand'
import { produce } from 'immer'

export const useAnimationBackdropContext = create((set) => ({
  result: {
    id: -1,
    result: '',
  },
  setResult: (result) => {
    set(
      produce((draft) => {
        draft.result = result
      })
    )
  },
  open: false,
  setOpen: (open, result = null) => {
    set(
      produce((draft) => {
        draft.open = open
        if (result) {
          draft.result = result
        }
      })
    )
  },
}))

export default useAnimationBackdropContext
