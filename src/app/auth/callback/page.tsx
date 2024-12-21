'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/shared/ui/layouts/MainLayout'

export default function Callback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

  useEffect(() => {
    const userId = searchParams.get('userId')
    const storedRedirectUrl = localStorage.getItem('redirect_before_login') // 로컬스토리지 값

    // redirectUrl 결정
    const calculatedRedirectUrl =
      searchParams.get('redirectUrl') || // URL에 있는 경우
      storedRedirectUrl || // 로컬스토리지 값
      (userId ? `/home/${userId}` : `/login`) // 기본값

    setRedirectUrl(calculatedRedirectUrl)

    // 디버깅 코드 : 삭제 예정
    console.log('searchParams redirectUrl:', searchParams.get('redirectUrl'))
    console.log(
      'localStorage redirect_before_login:',
      localStorage.getItem('redirect_before_login')
    )
    console.log('redirectUrl 결정:', calculatedRedirectUrl)
  }, [searchParams])

  useEffect(() => {
    if (redirectUrl) {
      const token = searchParams.get('accessToken')
      const userId = searchParams.get('userId')
      const selectedQuestion = localStorage.getItem('selectedQuestion')

      if (token && userId) {
        localStorage.setItem('keep_in_touch_token', token)
        localStorage.setItem('keep_in_touch_user_id', userId)
        // redirectUrl이 /questions/messages인 경우 selectedQuestion 확인
        if (redirectUrl === '/questions/messages') {
          if (!selectedQuestion) {
            console.error('selectedQuestion 데이터가 없습니다.')
            // 필요 시 추가 조치 (예: 에러 페이지로 리다이렉트)
            return
          }
          localStorage.setItem('selectedQuestion', selectedQuestion)
        }
        localStorage.removeItem('redirect_before_login') // 초기화
        router.push(decodeURIComponent(redirectUrl)) // 최종 redirectUrl로 이동
      } else {
        router.push('/login') // 토큰 또는 userId가 없으면 /login으로 이동
      }
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
