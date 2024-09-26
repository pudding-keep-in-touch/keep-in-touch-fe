'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/shared/ui/layouts/MainLayout'
export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('accessToken')

    if (token) {
      localStorage.setItem('keep_in_touch_token', token)
      router.push('/')
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
