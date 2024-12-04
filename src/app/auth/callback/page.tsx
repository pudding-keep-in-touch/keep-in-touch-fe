'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/shared/ui/layouts/MainLayout'

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    const token = searchParams.get('accessToken')
    const userId = searchParams.get('userId') as string

    // redirectUrl 결정
    const redirectUrl =
      searchParams.get('redirectUrl') || // 쿼리 파라미터에 redirectUrl이 있는 경우
      localStorage.getItem('redirect_before_login') || // 로컬스토리지에 저장된 이전 경로가 있는 경우
      (userId ? `/home/${userId}` : `/login`) // userId가 있으면 /home/${userId}, 없으면 /login

    if (token && userId) {
      localStorage.setItem('keep_in_touch_token', token)
      localStorage.setItem('keep_in_touch_user_id', userId)
      localStorage.removeItem('redirect_before_login') // 초기화
      router.push(decodeURIComponent(redirectUrl)) // 최종 redirectUrl로 이동
    } else {
      router.push('/login') // 토큰 또는 userId가 없으면 /login으로 이동
    }
  }, [searchParams, router])

  return (
    <MainLayout>
      <div className='flex items-center justify-center h-screen text-center text-[#333D4B] text-2xl font-bold'>
        로그인 중...
      </div>
    </MainLayout>
  )
}
