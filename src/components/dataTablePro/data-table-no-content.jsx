import { memo } from 'react'
import { Box } from '@mui/material'
import DataTableProEmptyContent from './data-table-pro-empty-content'

function DataTableNoContent({ rowCount = 0, sx = {} }) {
  if (rowCount > 0) return null

  return (
    <Box p={3} sx={{ height: 'inherit' }}>
      <DataTableProEmptyContent
        filled
        title={'無資料'}
        description={'目前無資料'}
        sx={{
          py: 10,
          ...sx,
        }}
      />
    </Box>
  )
}

export default memo(DataTableNoContent)
