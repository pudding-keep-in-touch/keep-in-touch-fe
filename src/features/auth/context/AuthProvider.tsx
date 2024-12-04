'use client'

import { usePathname, useRouter } from 'next/navigation'
import { decodeJwt } from 'jose'
import React from 'react'
import { API_BASE_URL, getLoginUrl } from '@/shared/config/env'

const AuthContext = React.createContext<{
  isLoggedIn: boolean
  isLoading: boolean
  userId: string | null
  logout: () => Promise<void>
}>({
  isLoggedIn: false,
  isLoading: true,
  userId: null,
  logout: async () => {
    throw new Error('useAuthContext must be used within an AuthProvider')
  },
})

export const useAuthContext = () => React.useContext(AuthContext)

type AuthProviderProps = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [authState, setAuthState] = React.useState({
    isLoggedIn: false,
    isLoading: true,
    userId: null as string | null,
  })

  const getFromLocalStorage = (key: string) =>
    typeof window !== 'undefined' ? localStorage.getItem(key) : null

  const checkAuth = async () => {
    const accessToken = getFromLocalStorage('keep_in_touch_token')
    const storedUserId = getFromLocalStorage('keep_in_touch_user_id')

    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }))
      console.log('1')
      if (!accessToken || !storedUserId) {
        throw new Error('No accessToken or userId')
      }

      console.log('2')
      console.log('storedUserId', storedUserId)

      const { exp } = decodeJwt(accessToken)

      if (
        !exp ||
        typeof exp !== 'number' ||
        exp < Math.floor(Date.now() / 1000)
      ) {
        throw new Error('Invalid or expired token')
      }

      console.log('3')
      setAuthState({ isLoggedIn: true, isLoading: false, userId: storedUserId })
      return true
    } catch (error) {
      console.error('Authentication error:', error)
      console.log('4')
      const redirectUrl = storedUserId ? `/home/${storedUserId}` : '/login'
      router.replace(getLoginUrl(`${window.location.origin}${redirectUrl}`))

      setAuthState({ isLoggedIn: false, isLoading: false, userId: null })
    }
  }

  console.log('authState', authState)

  const logout = async () => {
    try {
      console.log('No logout API call is needed in this application.')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setAuthState({ isLoggedIn: false, isLoading: false, userId: null })
      localStorage.removeItem('keep_in_touch_token')
      localStorage.removeItem('keep_in_touch_user_id')
      router.push('/login')
    }
  }

  React.useEffect(() => {
    checkAuth()
  }, [])

  React.useEffect(() => {
    if (
      !authState.isLoggedIn &&
      !authState.isLoading &&
      pathname !== '/login'
    ) {
      const redirectUrl = `/home/${authState.userId || ''}`
      router.replace(getLoginUrl(`${window.location.origin}${redirectUrl}`))
    }
  }, [
    authState.isLoggedIn,
    authState.isLoading,
    pathname,
    router,
    authState.userId,
  ])

  const value = React.useMemo(
    () => ({
      isLoggedIn: authState.isLoggedIn,
      isLoading: authState.isLoading,
      userId: authState.userId,
      logout,
    }),
    [authState, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
