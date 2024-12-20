'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import { useCookies } from 'react-cookie'

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectUrl, setRedirectUrl] = React.useState<string | null>(null)
  const [, setCookie] = useCookies([
    'keep_in_touch_token',
    'keep_in_touch_user_id',
  ]) // 쿠키 관리

  React.useEffect(() => {
    const userId = searchParams.get('userId')
    const storedRedirectUrl = localStorage.getItem('redirect_before_login')

    const calculatedRedirectUrl =
      searchParams.get('redirectUrl') ||
      storedRedirectUrl ||
      (userId ? `/home/${userId}` : `/login`)

    setRedirectUrl(calculatedRedirectUrl)
  }, [searchParams])

  React.useEffect(() => {
    if (!redirectUrl) return

    const token = searchParams.get('accessToken')
    const userId = searchParams.get('userId')
    const selectedQuestion = localStorage.getItem('selectedQuestion')

    if (redirectUrl === '/questions/messages' && !selectedQuestion) {
      console.error('selectedQuestion 데이터가 없습니다.')
      return
    }

    if (token && userId) {
      setCookie('keep_in_touch_token', token, { path: '/' })
      setCookie('keep_in_touch_user_id', userId, { path: '/' })

      localStorage.removeItem('redirect_before_login')
      router.push(decodeURIComponent(redirectUrl))
    } else {
      router.push('/login')
    }
  }, [redirectUrl, searchParams, router, setCookie])

  return (
    <MainLayout>
      <div className='flex items-center justify-center h-screen text-center text-[#333D4B] text-2xl font-bold'>
        로그인 중...
      </div>
    </MainLayout>
  )
}
