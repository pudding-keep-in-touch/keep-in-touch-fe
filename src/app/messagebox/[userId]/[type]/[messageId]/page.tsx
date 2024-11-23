'use client'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageDetail from '@/features/messagebox/ui/MessageDetail'
import React, { useState } from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { cn } from '@/shared/utils/emotionVariety'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Page({
  params: { userId, type, messageId },
}: {
  params: { userId: number; type: MessageType; messageId: number }
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <div className='w-full h-full'>
      <div className='flex justify-between h-full'>
        <header className='w-full h-[50px] flex justify-between items-center z-50 '>
          <ChevronLeftIcon className='w-6 h-6 cursor-pointer' />
          <div className='flex flex-col items-end h-full'>
            <button type='button' onClick={openModal}>
              <img src='/header_more.svg' />
            </button>
            {isOpen ? (
              <div className='relative bg-black w-[100px] h-[56px] rounded-2xl text-white'>
                <button
                  onClick={() =>
                    router.push(
                      `/messagebox/${userId}/${type}/${messageId}/singo`
                    )
                  }
                >
                  신고하기
                </button>
                {/* <Link>숨기기</Link> */}
              </div>
            ) : (
              ''
            )}
          </div>
        </header>
      </div>
      <MessageDetail userId={userId} messageId={messageId} messageType={type} />
    </div>
  )
}
