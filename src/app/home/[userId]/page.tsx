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

  React.useEffect(() => {
    const cookiesToken = cookies.keep_in_touch_token
    const cookiesUserId = cookies.keep_in_touch_user_id

    if (!cookiesToken || cookiesUserId !== userId) {
      router.replace('/') // TODO : 인증 실패 시 Unauthorized로 리다이렉트
    }
  }, [cookies, userId, router])

  return <Home userId={userId} />
}
