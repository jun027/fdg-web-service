import { memo } from 'react'
import { ListItemButton } from '@mui/material'
import styledListItemButton from './style/list-item-button.style'

function LoginMenuView({
  isLogoutLoading = false,
  onLogoutClick = () => {},
  onProfileClick = () => {},
}) {
  return (
    <>
      <ListItemButton key={'profile'} onClick={onProfileClick} sx={styledListItemButton}>
        <p className="w-full mobile-regular-h3 text-secondary-600 text-center">{'會員資料'}</p>
      </ListItemButton>
      <ListItemButton
        key={'logout'}
        disabled={isLogoutLoading}
        onClick={onLogoutClick}
        sx={{ padding: '1rem' }}
      >
        <p className="w-full mobile-regular-h3 text-secondary-600 text-center">{'登出'}</p>
      </ListItemButton>
    </>
  )
}

export default memo(LoginMenuView)
