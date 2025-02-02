'use client'

import { usePathname, useRouter } from 'next/navigation'
import { decodeJwt } from 'jose'
import React from 'react'

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
    const redirectUrl = localStorage.getItem('redirect_before_login')

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
        // 세션 만료 시 사용자에게 알림 및 로그인 페이지로 리다이렉트
        alert('세션이 만료되었습니다. 다시 로그인해주세요.')
        localStorage.removeItem('keep_in_touch_token')
        localStorage.removeItem('keep_in_touch_user_id')
        router.push('/login')
        throw new Error('Session expired')
      }

      console.log('3')
      setAuthState({ isLoggedIn: true, isLoading: false, userId: storedUserId })

      // 로그인 성공 시 redirect 처리
      if (redirectUrl) {
        localStorage.removeItem('redirect_before_login')
        router.replace(redirectUrl) // 이전 경로로 이동
      }
      return true
    } catch (error) {
      console.error('Authentication error:', error)
      console.log('4')
      // 강제 로그아웃
      localStorage.removeItem('keep_in_touch_token')
      localStorage.removeItem('keep_in_touch_user_id')
      router.replace('/login') // 로그인 페이지로 리다이렉트
      // const redirectUrl = storedUserId ? `/home/${storedUserId}` : '/login'
      // router.replace(getLoginUrl(`${window.location.origin}${redirectUrl}`))

      setAuthState({ isLoggedIn: false, isLoading: false, userId: null })
    }
  }

  console.log('authState', authState)

  // const logout = async () => {
  //   try {
  //     console.log('No logout API call is needed in this application.')
  //   } catch (error) {
  //     console.error('Logout error:', error)
  //   } finally {
  //     setAuthState({ isLoggedIn: false, isLoading: false, userId: null })
  //     localStorage.removeItem('keep_in_touch_token')
  //     localStorage.removeItem('keep_in_touch_user_id')
  //     router.push('/login')
  //   }
  // }

  const logout = async () => {
    try {
      setAuthState({ isLoggedIn: false, isLoading: false, userId: null })
      localStorage.removeItem('keep_in_touch_token')
      localStorage.removeItem('keep_in_touch_user_id')
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
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
      localStorage.setItem('redirect_before_login', pathname) // 이전 경로 저장
      router.replace('/login')
    }
  }, [authState.isLoggedIn, authState.isLoading, pathname, router])

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
