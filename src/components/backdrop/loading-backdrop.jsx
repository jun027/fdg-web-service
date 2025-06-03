'use client'

import { memo } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { useLoadingBackdropContext } from '@/store/backdrop/use-loading-backdrop-context'
import { palette } from '@/style/config'
import { BACKDROP_Z_INDEX_CONFIG } from './backdrop-zIndex-config'

function LoadingBackdrop() {
  const { loading } = useLoadingBackdropContext()

  return (
    <Backdrop
      sx={() => ({ color: palette.common.white, zIndex: BACKDROP_Z_INDEX_CONFIG.loading })}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default memo(LoadingBackdrop)
