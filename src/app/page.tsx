'use client'

import { decodeJwt } from 'jose'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useCookies } from 'react-cookie'

export default function Main() {
  const router = useRouter()
  const [cookies] = useCookies(['keep_in_touch_token', 'keep_in_touch_user_id']) // 쿠키 가져오기
  const [loading, setLoading] = React.useState(true) // 로딩 상태 관리
  const [isChecked, setIsChecked] = React.useState(false) // 체크 완료 플래그

  // TODO : 로그인 붙이고 처리 예정
  React.useEffect(() => {
    if (isChecked) return // 이미 체크한 경우 중복 실행 방지

    const checkToken = async () => {
      const token = cookies.keep_in_touch_token
      const userId = cookies.keep_in_touch_user_id

      if (!token || !userId) {
        console.warn('Main > No token or userId, redirecting to login.')
        redirectToLogin()
        return
      }

      try {
        const decoded = decodeJwt(token)
        console.log('Main > Decoded token:', decoded)
        const currentTime = Math.floor(Date.now() / 1000)

        console.log('Main > Current time:', currentTime)
        console.log('Main > Token expiration:', decoded.exp)

        if (decoded.exp && decoded.exp < currentTime) {
          console.warn('Main > Token has expired.')
          redirectToLogin()
          return
        }
      } catch (error) {
        console.error('Invalid token:', error)
        redirectToLogin()
        return
      }

      // 유효한 토큰과 유저 ID가 있는 경우
      setLoading(false)
      setIsChecked(true) // 체크 완료 플래그 설정
      router.push(`/home/${userId}`)
    }

    const redirectToLogin = () => {
      if (!isChecked) {
        setLoading(false)
        setTimeout(() => {
          router.replace('/login')
        }, 1000)
      }
    }

    checkToken()
  }, [
    cookies.keep_in_touch_token,
    cookies.keep_in_touch_user_id,
    isChecked,
    router,
  ])

  React.useEffect(() => {
    // TODO : 디버깅 삭제 예정
    console.log('Main > Token from cookies:', cookies.keep_in_touch_token)
    console.log('Main > UserId from cookies:', cookies.keep_in_touch_user_id)
  }, [cookies])

  if (loading) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center bg-white box-border'>
        {/* 로딩 스피너 또는 메시지 */}
        <p>Main Loading...</p>
      </div>
    )
  }

  // 안전한 로딩 종료를 위해 빈 화면을 반환 (필요 시 추가 렌더링 가능)
  return null
}
