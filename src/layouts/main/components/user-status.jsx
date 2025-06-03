'use client'

import { memo } from 'react'
import { useAuthContext } from '@/auth/hooks'
import { Skeleton } from '@mui/material'
import UnLoginStatus from './un-login-status'
import LoginStatus from './login-status'

function UserStatus() {
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Skeleton width={80} height={30} animation="wave" />
      </div>
    )
  }

  return user ? <LoginStatus /> : <UnLoginStatus />
}

export default memo(UserStatus)
