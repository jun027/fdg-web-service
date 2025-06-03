'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { useSetState } from '@/hook/use-set-state'
import getMemberInfoService from '@/services/member/info'
import logoutService from '@/services/auth/logout'

import { AuthContext } from './auth-context'
import { STORAGE_KEY } from './constant'
import { isValidToken, setSession } from './utils'

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  })

  const [logoutTrigger, setLogoutTrigger] = useState(false)

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY)

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken)

        const { memberInfo, statusInfo } = await getMemberInfoService()

        setState({
          user: {
            gender: memberInfo.gender,
            phone: memberInfo.phone,
            city: memberInfo.city,
            area: memberInfo.area,
            address: memberInfo.address,
            email: memberInfo.email,
            idNumber: memberInfo.id_number,

            account: statusInfo.username,
            memberId: statusInfo.member_id,
            name: statusInfo.name,
            memberLevel: statusInfo.member_level,
            status: statusInfo.status,
            isInfoSet: statusInfo.is_info_set,
          },
          loading: false,
        })
      } else {
        setState({ user: null, loading: false })
      }
    } catch (error) {
      console.error(error)
      setState({ user: null, loading: false })
    }
  }, [setState])

  const handleLogout = useCallback(async () => {
    try {
      const response = await logoutService()

      if (response.code === 0) {
        await setSession(null)
        setLogoutTrigger(true)
        await checkUserSession()
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error(error)
    }
  }, [checkUserSession])

  useEffect(() => {
    checkUserSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated'

  const status = state.loading ? 'loading' : checkAuthenticated

  const memoizedValue = useMemo(
    () => ({
      user: state.user || null,
      checkUserSession,
      logoutTrigger,
      setLogoutTrigger,
      handleLogout,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, handleLogout, logoutTrigger, state.user, status]
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
