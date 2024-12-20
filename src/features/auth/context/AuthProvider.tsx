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
      console.log('AuthContext > Decoded exp:', exp)
      const currentTime = Math.floor(Date.now() / 1000)
      console.log('AuthContext > Current time:', currentTime)

      return !(exp && exp < currentTime)
    } catch (error) {
      console.error('AuthProvider > Error decoding JWT:', error)
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
    try {
      const accessToken = cookies.keep_in_touch_token
      const userId = cookies.keep_in_touch_user_id
      const redirectUrl = localStorage.getItem('redirect_before_login') || null

      if (!accessToken || !isTokenValid(accessToken)) {
        throw new Error('Invalid or expired token')
      }

      setAuthState({ isLoggedIn: true, isLoading: false, userId })

      if (redirectUrl) {
        localStorage.removeItem('redirect_before_login')
        router.replace(redirectUrl)
      }
    } catch (error) {
      console.error(error)
      toast.error('세션이 만료되었습니다. 다시 로그인해주세요.')
      handleLogout()
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
    return <div>Loading...</div>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
