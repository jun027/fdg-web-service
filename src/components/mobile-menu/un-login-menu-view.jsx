import { memo } from 'react'

import { PATHS } from '@/routes/page'
import { ListItemButton } from '@mui/material'

function UnLoginMenuView({ onClick = () => {} }) {
  return (
    <ListItemButton
      key={'login'}
      data-link={PATHS.Auth.child.Login.path}
      onClick={onClick}
      sx={{ padding: '1rem' }}
    >
      <p className="w-full mobile-regular-h3 text-secondary-600 text-center">{'會員登入/註冊'}</p>
    </ListItemButton>
  )
}

export default memo(UnLoginMenuView)
