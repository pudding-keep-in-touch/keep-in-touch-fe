'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/shared/ui/layouts/MainLayout'

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirectUrl') || '/home'

  useEffect(() => {
    const token = searchParams.get('accessToken')
    const userId = searchParams.get('userId') as string

    if (token) {
      localStorage.setItem('keep_in_touch_token', token)
      localStorage.setItem('keep_in_touch_user_id', userId)
      router.push(decodeURIComponent(redirectUrl))
    } else {
      router.push('/login')
    }
  }, [searchParams, router])

  return (
    <MainLayout>
      <div className='flex items-center justify-center h-screen'>
        로그인 중...
      </div>
    </MainLayout>
  )
}
