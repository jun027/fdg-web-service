import { Box, CircularProgress } from '@mui/material'
import { memo } from 'react'

function DataTableLoading(props) {
  const { ...other } = props
  return (
    <Box {...other}>
      <CircularProgress />
    </Box>
  )
}

export default memo(DataTableLoading)
