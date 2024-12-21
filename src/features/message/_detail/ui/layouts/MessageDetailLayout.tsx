'use client'

import React from 'react'
import {
  MainLayoutProps,
  MessageType,
  VarietyType,
} from '@/shared/types/common.types'
import { cn } from '@/shared/utils/emotionVariety'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCookies } from 'react-cookie'

type MessageDetailLayout = MainLayoutProps & {
  messageType: MessageType
  variety: VarietyType
}

export default function MessageDetailLayout({
  children,
  messageType,
  variety,
}: MessageDetailLayout) {
  const [cookies] = useCookies(['keep_in_touch_user_id'])

  const userId = cookies.keep_in_touch_user_id

  const router = useRouter()
  const param = useSearchParams()
  const baseUrl = param.get('base')

  const backHandler = () => {
    if (userId) {
      if (baseUrl === 'home') {
        router.replace(`/message/${messageType}/${userId}?base=${baseUrl}`)
      } else if (baseUrl === 'sent') {
        router.push(`/message/sent/${userId}?base=${baseUrl}`)
      } else {
        router.replace(`/message/${messageType}/${userId}`)
      }
    } else {
      router.back()
    }
  }

  const makeBgClass =
    variety === 'thanks' ? `bg-thanksPreview` : `bg-honestTalkPreview`

  return (
    <div
      className={cn(
        'w-full min-h-screen flex flex-col items-center pb-16 px-6 bg-cover bg-center',
        makeBgClass
      )}
    >
      <header className='w-full h-[50px] grid grid-cols-3 items-center z-50'>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={backHandler}
        />
      </header>

      {children}
    </div>
  )
}
