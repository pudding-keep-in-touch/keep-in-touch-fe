'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/shared/ui/layouts/MainLayout'

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl =
    searchParams.get('redirectUrl') ||
    localStorage.getItem('redirect_before_login') || // 저장된 이전 경로 사용
    `/login` // 기본값

  React.useEffect(() => {
    const token = searchParams.get('accessToken')
    const userId = searchParams.get('userId') as string

    if (token && userId) {
      localStorage.setItem('keep_in_touch_token', token)
      localStorage.setItem('keep_in_touch_user_id', userId)
      localStorage.removeItem('redirect_before_login') // 초기화
      router.push(decodeURIComponent(redirectUrl))
    } else {
      router.push('/login')
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
