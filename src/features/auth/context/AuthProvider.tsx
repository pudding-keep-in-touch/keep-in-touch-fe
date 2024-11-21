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
  logout: async () => {},
})

export const useAuthContext = () => React.useContext(AuthContext)

type AuthProviderProps = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [userId, setUserId] = React.useState<string | null>(null)

  const checkAuth = async () => {
    try {
      setIsLoading(true)

      const accessToken = localStorage.getItem('keep_in_touch_token')
      const storedUserId = localStorage.getItem('keep_in_touch_user_id')

      if (!accessToken || !storedUserId) {
        throw new Error('No accessToken or userId')
      }

      // JWT 검증
      const { exp } = decodeJwt(accessToken)

      if (!exp) throw new Error('No exp')
      if (exp > Math.floor(Date.now() / 1000)) {
        setIsLoggedIn(true)
        setUserId(storedUserId)

        return true
      }
    } catch (error) {
      setIsLoggedIn(false)
      setUserId(null)
      localStorage.removeItem('keep_in_touch_token')
      localStorage.removeItem('keep_in_touch_user_id')

      console.error('Authentication error:', error)
      // await logout()
      router.replace(getLoginUrl(window.location.href))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // 로그아웃 API 호출 로직 (필요 시 구현)
      // await fetch(`${API_BASE_URL}/v1/auth/logout`, { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggedIn(false)
      setUserId(null)
      localStorage.removeItem('keep_in_touch_token')
      localStorage.removeItem('keep_in_touch_user_id')
      router.push('/login')
    }
  }

  React.useEffect(() => {
    checkAuth()
  }, [])

  React.useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.replace(getLoginUrl(window.location.href))
    }
  }, [isLoggedIn, isLoading, pathname, router])

  const value = React.useMemo(
    () => ({
      isLoggedIn,
      isLoading,
      userId,
      logout,
    }),
    [isLoggedIn, isLoading, userId]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
