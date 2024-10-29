'use client'

import MessageSendStep from '../../_components/step'
import MessageSendNextButton from './nextButton'
import MessageSendSelect from './select'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getLoginUrl } from '@/shared/config'

export default function SelectBoard({ userId }: { userId: number }) {
  // const accessToken = localStorage.getItem('keep_in_touch_token')
  const router = useRouter()

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('keep_in_touch_token')

      if (!token) {
        // 로그인되어 있지 않은 경우
        const currentUrl = encodeURIComponent(
          `${window.location.origin}/${userId}/select`
        )

        const loginUrl = getLoginUrl(currentUrl)
        window.location.href = loginUrl
      }
    }

    checkLoginStatus()
  }, [router])

  return (
    <>
      <div className='mt-[30px] mb-5'>
        <MessageSendStep active={1} />
      </div>

      <p className='font-medium text-lg mb-10'>쪽지 타입을 선택해 주세요!</p>

      <MessageSendSelect />

      <MessageSendNextButton userId={userId} />
    </>
  )
}
