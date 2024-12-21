'use client'

import { decodeJwt } from 'jose'
import { useRouter } from 'next/navigation'
import React from 'react'
import { getCookie } from '@/shared/utils/cookieUtils'

function isTokenValid(token: string | null): boolean {
  if (!token) return false

  try {
    const { exp } = decodeJwt(token) as { exp?: number }
    if (!exp) return false

    const currentTime = Math.floor(Date.now() / 1000) // 현재 시간 (초 단위)
    return exp > currentTime // 토큰이 만료되지 않았으면 true
  } catch (error) {
    console.error('Invalid token:', error)
    return false
  }
}

// isUserLoggedIn을 일반 함수로 수정
function isUserLoggedIn(): boolean {
  const token = getCookie('keep_in_touch_token')
  return isTokenValid(token)
}

export function useRedirectToLoginIfNeeded(
  isLoading: boolean,
  callback: () => void
) {
  const isLoggedIn = isUserLoggedIn()
  const router = useRouter()

  const stableCallback = React.useCallback(callback, [callback]) // callback을 안정적으로 유지

  React.useEffect(() => {
    if (isLoading) return // 로딩 중일 때는 아무 작업도 하지 않음

    if (!isLoggedIn) {
      const redirectUrl = '/questions/messages'
      localStorage.setItem('redirect_before_login', redirectUrl)
      router.replace(`/login?redirectUrl=${encodeURIComponent(redirectUrl)}`) // replace로 히스토리 관리
    } else {
      stableCallback() // 로그인 상태라면 콜백 실행
    }
  }, [isLoggedIn, isLoading, router, stableCallback])
}
