'use client'

import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { NavigationBar } from '../../../../../shared/ui/layouts/NavigationBar'
import { cn } from '@/shared/utils/emotionVariety'
import { BoxType } from '@/features/messagebox/model/messagebox.types'
interface InboxLayoutProps {
  children: React.ReactNode
  title: string
}

const mockData = { userId: 1, nickname: 'John Doe' }

export default function InboxLayout({ children, title }: InboxLayoutProps) {
  // const userId = localStorage.getItem('keep_in_touch_user_id')
  const userId = mockData.userId
  const router = useRouter()
  const pathname = usePathname()
  const param = useSearchParams()
  const baseUrl = param.get('base')

  // const backHandler = () => {
  //   if (userId) {
  //     if (baseUrl === 'home') {
  //       router.replace(`/messagebox/inbox/${userId}?base=${baseUrl}`)
  //     } else if (baseUrl === 'reaction') {
  //       router.push(`/message/inbox/${userId}?base=${baseUrl}`)
  //     } else if (baseUrl === 'outbox') {
  //       router.replace(`/message/outbox/${userId}`)
  //     } else if (baseUrl === 'inbox') {
  //       router.replace(`/message/inbox/${userId}`)
  //     }
  //   } else {
  //     router.back()
  //   }
  // }

  const makeBgClass = pathname.endsWith('/reaction')
    ? `bg-[#FFFFFF]`
    : `bg-[#F7F7FC]`

  return (
    <div
      className={cn(
        'w-full min-h-screen flex flex-col items-center pb-16 px-6 bg-cover bg-center',
        makeBgClass
      )}
    >
      <header className='w-full h-[50px] grid grid-cols-3 items-center z-50 '>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={() => router.back()}
        />
        <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
          {title}
        </h1>
      </header>
      {children}
    </div>
  )
}
