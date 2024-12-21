'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import { removeCookie, setCookie } from '@/shared/utils/cookieUtils'

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectUrl, setRedirectUrl] = React.useState<string | null>(null)

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

    if (token && userId) {
      console.log('Callback > Token received:', token)
      console.log('Callback > UserId received:', userId)

      setCookie('keep_in_touch_token', token, { path: '/', maxAge: 3600 })
      setCookie('keep_in_touch_user_id', userId, { path: '/', maxAge: 3600 })

      localStorage.removeItem('redirect_before_login')
      router.push(decodeURIComponent(redirectUrl))
    } else {
      removeCookie('keep_in_touch_token')
      removeCookie('keep_in_touch_user_id')
      router.push('/login')
    }
  }, [redirectUrl, searchParams, router])

  return (
    <MainLayout>
      <div className='flex items-center justify-center h-screen text-center text-[#333D4B] text-2xl font-bold'>
        로그인 중...
      </div>
    </MainLayout>
  )
}
