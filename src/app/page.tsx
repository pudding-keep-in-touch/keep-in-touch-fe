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
        redirectToLogin()
        return
      }

      try {
        const decoded = decodeJwt(token)
        const currentTime = Math.floor(Date.now() / 1000)

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
      setLoading(false)
      setIsChecked(true) // 체크 완료 플래그 설정
      router.push(`/home/${userId}`)
    }

    const redirectToLogin = () => {
      setTimeout(() => {
        router.replace('/login') // `push` 대신 `replace`로 중복 방지
      }, 2000)
      setLoading(false)
    }

    checkToken()
  }, [
    cookies.keep_in_touch_token,
    cookies.keep_in_touch_user_id,
    isChecked,
    router,
  ])

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
