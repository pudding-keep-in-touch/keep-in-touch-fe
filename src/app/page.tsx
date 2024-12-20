'use client'

import { decodeJwt } from 'jose'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useCookies } from 'react-cookie'

export default function Main() {
  const router = useRouter()
  const [cookies] = useCookies(['keep_in_touch_token', 'keep_in_touch_user_id']) // 쿠키 가져오기
  const [loading, setLoading] = React.useState(true) // 로딩 상태 관리
  // TODO : 로그인 붙이고 처리 예정
  React.useEffect(() => {
    const checkToken = async () => {
      const token = cookies.keep_in_touch_token // 쿠키에서 토큰 가져오기
      const userId = cookies.keep_in_touch_user_id // 쿠키에서 유저 아이디 가져오기

      if (!token || !userId) {
        redirectToLogin()
        return
      }

      try {
        // JWT 디코딩
        const decoded = decodeJwt(token)
        const currentTime = Math.floor(Date.now() / 1000) // 현재 시간 (초 단위)

        // 만료 시간 확인
        if (decoded.exp && decoded.exp < currentTime) {
          console.warn('Token has expired.')
          redirectToLogin()
          return
        }
      } catch (error) {
        console.error('Invalid token:', error)
        redirectToLogin()
        return
      }

      // 유효한 토큰과 유저 ID가 있는 경우
      router.push(`/home/${userId}`)
    }

    const redirectToLogin = () => {
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      setLoading(false) // 로딩 상태 종료
    }

    checkToken()
  }, [cookies, router])

  if (loading) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center bg-white box-border'>
        {/* 로딩 스피너 또는 메시지 */}
        <p>Loading...</p>
      </div>
    )
  }

  // 안전한 로딩 종료를 위해 빈 화면을 반환 (필요 시 추가 렌더링 가능)
  return null
}
