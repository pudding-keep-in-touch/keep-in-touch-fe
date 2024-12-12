'use client'

import React, { useState } from 'react'
import {
  MainLayoutProps,
  MessageType,
  VarietyType,
} from '@/shared/types/common.types'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/utils/emotionVariety'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
type MessageDetailLayout = MainLayoutProps & {
  children: React.ReactNode
  messageType: MessageType
  variety: VarietyType
  messageId: string
}

export default function MessageDetailLayout({
  children,
  messageType,
  messageId,
  variety,
}: MessageDetailLayout) {
  const userId =
    typeof window !== 'undefined'
      ? localStorage.getItem('keep_in_touch_user_id')
      : null
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen((e) => !e)
  }
  const backHandler = () => {
    if (userId) {
      router.back()
    } else {
      console.log('go to error page !! no userId')
    }
  }
  const makeBgClass = pathname.endsWith('/reaction')
    ? 'bg-[#FFFFFF]'
    : variety
      ? variety === 'thanks'
        ? `bg-thanksPreview`
        : `bg-honestTalkPreview`
      : 'bg-thanksPreview'

  return (
    <div
      className={cn(
        'relative w-full pb-safe-bottom z-0 h-screen-safe flex flex-col bg-cover bg-center items-center',
        makeBgClass
      )}
    >
      <div className='max-w-[390px] pb-32  w-full z-0 overflow-y-scroll scrollbar-hide mb-5'>
        <header className='w-full h-[50px] flex justify-between items-center z-50 px-6'>
          <ChevronLeftIcon
            className='w-6 h-6 cursor-pointer'
            onClick={backHandler}
          />
          {messageType === 'received' && (
            <div className='flex flex-col items-end'>
              <button type='button' onClick={openModal}>
                <Image
                  src='/header_more.svg'
                  alt='header modal button'
                  width={5}
                  height={5}
                />
              </button>
              {isOpen && (
                <div
                  onClick={openModal}
                  className='fixed mt-[20px] flex flex-col justify-center items-center bg-black w-[100px] h-[56px] rounded-xl text-white'
                >
                  <Link
                    href={`/messagebox/${userId}/${messageType}/${messageId}/report`}
                  >
                    신고하기
                  </Link>
                  <Link
                    href={`/messagebox/${userId}/${messageType}/${messageId}/hide`}
                  >
                    숨기기
                  </Link>
                </div>
              )}
            </div>
          )}
        </header>
      </div>
      {children}
    </div>
  )
}
