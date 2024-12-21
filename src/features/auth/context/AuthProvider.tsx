'use client'

import { useRouter } from 'next/navigation'
import { decodeJwt } from 'jose'
import React from 'react'
import toast from 'react-hot-toast'
import { getCookie, removeCookie } from '@/shared/utils/cookieUtils'

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoading: true,
  userId: null as string | null,
})

export const useAuthContext = () => React.useContext(AuthContext)

type AuthProviderProps = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [authState, setAuthState] = React.useState({
    isLoggedIn: false,
    isLoading: true,
    userId: null as string | null,
  })

  const isTokenValid = (token: string): boolean => {
    try {
      const { exp } = decodeJwt(token)
      const currentTime = Math.floor(Date.now() / 1000)

      console.log('AuthContext > Decoded exp:', exp)
      console.log('AuthContext > Current time:', currentTime)

      // exp가 숫자인지 확인 후 비교
      return typeof exp === 'number' && exp > currentTime
    } catch (error) {
      console.error('AuthProvider > Error decoding JWT:', error)
      return false
    }
  }

  const handleLogout = () => {
    console.log('AuthProvider > Logging out and navigating to /login')

    removeCookie('keep_in_touch_token')
    removeCookie('keep_in_touch_user_id')
    setAuthState({ isLoggedIn: false, isLoading: false, userId: null })
    router.replace('/login')
  }

  const checkAuth = async () => {
    const accessToken = getCookie('keep_in_touch_token')
    const userId = getCookie('keep_in_touch_user_id')
    const redirectUrl = localStorage.getItem('redirect_before_login') || null

    console.log('AuthProvider > accessToken:', accessToken)
    console.log('AuthProvider > userId:', userId)

    // 토큰이 없는 경우
    if (!accessToken) {
      console.warn('AuthProvider > No access token available.')
      toast.error('로그인이 필요합니다.')
      handleLogout()
      return
    }

    // 토큰이 있지만 유효하지 않은 경우
    if (!isTokenValid(accessToken)) {
      console.warn('AuthProvider > Invalid or expired token.')
      toast.error('세션이 만료되었습니다. 다시 로그인해주세요.')
      handleLogout()
      return
    }

    // 토큰 유효한 경우
    setAuthState({ isLoggedIn: true, isLoading: false, userId })

    // 이전 경로가 있는 경우 이동
    if (redirectUrl) {
      localStorage.removeItem('redirect_before_login')
      console.log(`AuthProvider > Redirecting to saved URL: ${redirectUrl}`)
      router.replace(redirectUrl)
    }
  }

  React.useEffect(() => {
    if (authState.isLoading) {
      checkAuth()
    }
  }, [authState.isLoading])

  const value = React.useMemo(
    () => ({
      isLoggedIn: authState.isLoggedIn,
      isLoading: authState.isLoading,
      userId: authState.userId,
    }),
    [authState]
  )

  if (authState.isLoading) {
    return <div>AuthProvider Loading...</div>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
