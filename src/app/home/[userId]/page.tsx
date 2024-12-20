'use client'

import Home from '@/features/home/home'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useCookies } from 'react-cookie'

export default function HomePage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const router = useRouter()
  const [cookies] = useCookies(['keep_in_touch_token', 'keep_in_touch_user_id'])
  const [isChecked, setIsChecked] = React.useState(false) // 플래그 추가

  React.useEffect(() => {
    if (isChecked) return // 이미 체크한 경우 다시 실행하지 않음

    const cookiesToken = cookies.keep_in_touch_token
    const cookiesUserId = cookies.keep_in_touch_user_id

    if (!cookiesToken || cookiesUserId !== userId) {
      router.replace('/') // 인증 실패 시 Unauthorized로 리다이렉트
    } else {
      setIsChecked(true) // 체크 완료 플래그 설정
    }
  }, [
    cookies.keep_in_touch_token,
    cookies.keep_in_touch_user_id,
    userId,
    isChecked,
    router,
  ])

  return <Home userId={userId} />
}
