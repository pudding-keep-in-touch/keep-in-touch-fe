'use client'

import { usePathname, useRouter } from 'next/navigation'
import { decodeJwt } from 'jose'
import React from 'react'
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast'

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
  const pathname = usePathname()
  const router = useRouter()
  const [cookies, , removeCookie] = useCookies([
    'keep_in_touch_token',
    'keep_in_touch_user_id',
  ])
  const [authState, setAuthState] = React.useState({
    isLoggedIn: false,
    isLoading: true,
    userId: null as string | null,
  })

  const isTokenValid = (token: string): boolean => {
    try {
      const { exp } = decodeJwt(token)
      const currentTime = Math.floor(Date.now() / 1000)
      return !(exp && exp < currentTime)
    } catch {
      return false
    }
  }

  const handleLogout = () => {
    console.log('Logging out and navigating to /login')
    removeCookie('keep_in_touch_token', { path: '/' })
    removeCookie('keep_in_touch_user_id', { path: '/' })
    setAuthState({ isLoggedIn: false, isLoading: false, userId: null })
    router.replace('/login')
  }

  const checkAuth = async () => {
    try {
      const accessToken = cookies.keep_in_touch_token
      const userId = cookies.keep_in_touch_user_id

      const redirectUrl =
        typeof window !== 'undefined'
          ? localStorage.getItem('redirect_before_login')
          : null

      if (!accessToken) {
        toast.error('인증 정보가 없습니다.')
        console.error('No access token available.')
        throw new Error('No access token available.')
      }

      if (!isTokenValid(accessToken)) {
        toast.error('세션이 만료되었습니다. 다시 로그인해주세요.')
        throw new Error('Access token is invalid or expired.')
      }

      // 인증 성공: 상태 업데이트
      setAuthState({ isLoggedIn: true, isLoading: false, userId })

      // 리다이렉트 URL이 있는 경우 이동
      if (redirectUrl) {
        localStorage.removeItem('redirect_before_login') // 이전 경로 초기화
        console.log(`Redirecting to saved URL: ${redirectUrl}`)
        router.replace(redirectUrl)
      }
    } catch (error) {
      console.error(error)

      // 에러 발생 시 로그아웃 및 로그인 페이지로 리다이렉트
      handleLogout()
    }
  }

  React.useEffect(() => {
    if (authState.isLoading) {
      checkAuth()
    }
  }, [
    authState.isLoading,
    cookies.keep_in_touch_token,
    cookies.keep_in_touch_user_id,
  ])

  React.useEffect(() => {
    if (
      !authState.isLoggedIn &&
      !authState.isLoading &&
      pathname !== '/login'
    ) {
      localStorage.setItem('redirect_before_login', pathname)
      router.replace('/login')
    }
  }, [authState.isLoggedIn, authState.isLoading, pathname, router])

  const value = React.useMemo(
    () => ({
      isLoggedIn: authState.isLoggedIn,
      isLoading: authState.isLoading,
      userId: authState.userId,
    }),
    [authState]
  )

  if (authState.isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p>AuthContext Loading...</p>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
