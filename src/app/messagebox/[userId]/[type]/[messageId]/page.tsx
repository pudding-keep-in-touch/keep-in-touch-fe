'use client'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageDetail from '@/features/messagebox/ui/MessageDetail'
import React, { useState } from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function Page({
  params: { userId, type, messageId },
}: {
  params: { userId: number; type: MessageType; messageId: number }
}) {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <div className='w-full h-full'>
      <div className='flex justify-between h-full mb-[20px]'>
        <header className='w-full h-[50px] flex justify-between items-center z-50 '>
          <ChevronLeftIcon className='w-6 h-6 cursor-pointer' />
          <div className='flex flex-col items-end'>
            <button type='button' onClick={openModal}>
              <img src='/header_more.svg' />
            </button>
            {isOpen && (
              <div className=' bg-black w-[100px] h-[56px] rounded-2xl text-white'>
                <Link
                  href={`/messagebox/${userId}/${type}/${messageId}/report`}
                >
                  신고하기
                </Link>
                <Link href={`/messagebox/${userId}/${type}/${messageId}/hide`}>
                  숨기기
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
      <MessageDetail userId={userId} messageId={messageId} messageType={type} />
    </div>
  )
}
