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

  const [isChecked, setIsChecked] = React.useState(false) // 인증 체크 완료 플래그

  // JWT 만료 여부 확인
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
    removeCookie('keep_in_touch_token')
    removeCookie('keep_in_touch_user_id')
    router.replace('/login')
    setAuthState({ isLoggedIn: false, isLoading: false, userId: null })
  }

  const checkAuth = async () => {
    const accessToken = cookies.keep_in_touch_token
    const userId = cookies.keep_in_touch_user_id
    const redirectUrl =
      typeof window !== 'undefined'
        ? localStorage.getItem('redirect_before_login')
        : null

    if (!accessToken) {
      toast.error('인증 정보가 없습니다.')
      handleLogout()
      return
    }

    if (!isTokenValid(accessToken)) {
      toast.error('세션이 만료되었습니다. 다시 로그인해주세요.')
      handleLogout()
      return
    }

    setAuthState({ isLoggedIn: true, isLoading: false, userId })

    if (redirectUrl) {
      localStorage.removeItem('redirect_before_login')
      router.replace(redirectUrl)
    }
    setIsChecked(true) // 인증 체크 완료
  }

  console.log('authState', authState)

  React.useEffect(() => {
    if (!isChecked) {
      checkAuth()
    }
  }, [cookies.keep_in_touch_token, cookies.keep_in_touch_user_id, isChecked])

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
    }),
    [authState]
  )

  if (authState.isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p>Loading...</p>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
