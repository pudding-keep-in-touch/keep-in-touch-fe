'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import { getLoginUrl } from '@/shared/config/env'
import MessageSendStep from '@/features/message/_send/ui/step'
import MessageSendSelect from '@/features/message/_send/_select/ui/select'
import MessageSendNextButton from '@/features/message/_send/_select/ui/nextButton'

export default function SelectBoard({ userId }: { userId: string }) {
  // const accessToken = localStorage.getItem('keep_in_touch_token')
  const router = useRouter()

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const token =
  //       typeof window !== 'undefined'
  //         ? localStorage.getItem('keep_in_touch_token')
  //         : null

  //     if (!token) {
  //       // 로그인되어 있지 않은 경우
  //       const currentUrl = encodeURIComponent(
  //         `${window.location.origin}/${userId}/select`
  //       )

  //       const loginUrl = getLoginUrl(currentUrl)
  //       window.location.href = loginUrl
  //     }
  //   }

  //   checkLoginStatus()
  // }, [router])

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
