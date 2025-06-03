import { Popover } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledPopover = styled(Popover)({
  pointerEvents: 'none',

  '& .MuiPaper-root': {
    padding: '0 0',
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    backgroundColor: '#FAF5ED',
    width: '200px',
  },
})
