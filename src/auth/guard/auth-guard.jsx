'use client'

import React, { Suspense, useCallback, useEffect, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from '@/routes/hooks'
import { SplashScreen } from '@/components/loading-screen'

import { useAuthContext } from '../hooks'
import { PATHS } from '@/routes/page'

function AuthGuardContainer({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { authenticated, loading, logoutTrigger, setLogoutTrigger } = useAuthContext()

  const [isChecking, setIsChecking] = useState(true)

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const checkPermissions = async () => {
    if (loading) {
      return
    }

    if (!authenticated) {
      const signInPath = PATHS.Auth.child.Login.path

      let href = ''

      if (logoutTrigger) {
        href = PATHS.Home.path
      } else {
        href = `${signInPath}?${createQueryString('returnTo', pathname)}`
      }

      router.replace(href)

      setLogoutTrigger(false)
      return
    }

    setIsChecking(false)
  }

  useEffect(() => {
    checkPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading])

  if (isChecking) {
    return <SplashScreen />
  }

  return <>{children}</>
}

export function AuthGuard({ children }) {
  return (
    <Suspense>
      <AuthGuardContainer>{children}</AuthGuardContainer>
    </Suspense>
  )
}
