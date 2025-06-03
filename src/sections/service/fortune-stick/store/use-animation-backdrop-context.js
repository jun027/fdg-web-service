import { create } from 'zustand'
import { produce } from 'immer'

export const useAnimationBackdropContext = create((set, get) => ({
  onAnimationPlay: () => {},
  registerAnimationPlay: (fn) => {
    set({ onAnimationPlay: fn })
  },
  result: {
    title: '',
    body: '',
    content: '',
  },
  setResult: (result) => {
    set({ result: result })
  },
  showResult: {
    title: '',
    body: '',
    content: '',
  },
  transferResultToShowResult: () => {
    set(
      produce((draft) => {
        draft.showResult.title = get().result.title
        draft.showResult.body = get().result.body
        draft.showResult.content = get().result.content
      })
    )
  },
  clearShowResult: () => {
    set(
      produce((draft) => {
        draft.showResult.title = ''
        draft.showResult.body = ''
        draft.showResult.content = ''
      })
    )
  },
  open: false,
  setOpen: (open) => {
    set({ open: open })
    if (open) {
      get().onAnimationPlay()
    }
  },
}))

export default useAnimationBackdropContext
