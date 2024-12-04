'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/shared/ui/layouts/MainLayout'

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  console.log('Callback 컴포넌트 렌더링됨') // 렌더링 여부 확인

  const redirectUrl = searchParams.get('redirectUrl') || '/home'
  console.log('redirectUrl:', redirectUrl)

  useEffect(() => {
    console.log('useEffect 실행됨') // useEffect가 실행되는지 확인

    const token = searchParams.get('accessToken')
    const userId = searchParams.get('userId') as string

    console.log('토큰:', token)
    console.log('유저 ID:', userId)

    if (token) {
      localStorage.setItem('keep_in_touch_token', token)
      localStorage.setItem('keep_in_touch_user_id', userId)
      const decodedRedirectUrl = decodeURIComponent(redirectUrl)
      console.log('Redirecting to:', decodedRedirectUrl)
      router.push(decodedRedirectUrl)
    } else {
      router.push('/login')
    }
  }, [searchParams, router, redirectUrl])

  return (
    <MainLayout>
      <div className='flex items-center justify-center h-screen text-center text-[#333D4B] text-2xl font-bold'>
        로그인 중...
      </div>
    </MainLayout>
  )
}
