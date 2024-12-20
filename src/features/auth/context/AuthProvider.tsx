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
    removeCookie('keep_in_touch_token', { path: '/' })
    removeCookie('keep_in_touch_user_id', { path: '/' })
    setAuthState({ isLoggedIn: false, isLoading: false, userId: null })
    router.replace('/login')
  }

  const checkAuth = async () => {
    const accessToken = cookies.keep_in_touch_token
    const userId = cookies.keep_in_touch_user_id
    const redirectUrl =
      typeof window !== 'undefined'
        ? localStorage.getItem('redirect_before_login')
        : null

    if (!accessToken || !isTokenValid(accessToken)) {
      toast.error('세션이 만료되었습니다. 다시 로그인해주세요.')
      handleLogout()
      return
    }

    setAuthState({ isLoggedIn: true, isLoading: false, userId })

    if (redirectUrl) {
      localStorage.removeItem('redirect_before_login')
      router.replace(redirectUrl)
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
