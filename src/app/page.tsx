'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Main() {
  const router = useRouter()

  // TODO : 로그인 붙이고 처리 예정
  React.useEffect(() => {
    const checkToken = async () => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('keep_in_touch_token')
          : null
      const userId =
        typeof window !== 'undefined'
          ? localStorage.getItem('keep_in_touch_user_id')
          : null

      if (!token || !userId) {
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }
      router.push(`/home/${userId}`)
    }
    checkToken()
  }, [router])

  // TODO : 로딩 스피너 추가 예정
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-white box-border'></div>
  )
}
