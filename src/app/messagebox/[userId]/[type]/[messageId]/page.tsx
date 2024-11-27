'use client'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageDetail from '@/features/messagebox/ui/MessageDetail'
import React, { useState } from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Page({
  params: { userId, type, messageId },
}: {
  params: { userId: number; type: MessageType; messageId: number }
}) {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen((e) => !e)
  }

  return (
    <div className='w-full h-full'>
      <div className='flex justify-between h-full mb-[20px]'>
        <header className='w-full h-[50px] flex justify-between items-center z-50 '>
          <ChevronLeftIcon className='w-6 h-6 cursor-pointer' />
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
