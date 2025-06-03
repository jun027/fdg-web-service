import { useMediaQuery } from '@mui/material'

function useIsDesktop(breakpoint = 650) {
  return useMediaQuery(`(min-width: ${breakpoint}px)`)
}

export default useIsDesktop
