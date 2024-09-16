'use client'

import { DmList } from '@/shared/types'
import Image from 'next/image'
import { ChevronRightIcon } from 'lucide-react'

interface MessagePreviewProps {
  receivedDm: DmList
  title: string
}

export default function MessagePreview({
  receivedDm,
  title,
}: MessagePreviewProps) {
  return (
    <div className='w-full rounded-2xl bg-white overflow-hidden'>
      <div className='w-full h-[60px] bg-[#F6F7FC] p-5 flex justify-between items-center'>
        <h1 className='text-xl font-medium'>{title}</h1>
        <ChevronRightIcon className='w-6 h-6 cursor-pointer' />
      </div>
      <div className='w-full px-5 py-7 bg-white'>
        <div className='flex gap-5'>
          <Image
            className='bg-zinc-300 rounded-lg w-[54px] h-[54px] shrink-0'
            src={receivedDm.emotion.emoji}
            alt={receivedDm.emotion.name}
            width={54}
            height={54}
          />

          <div>
            <div className='font-semibold text-slate-700'>
              {receivedDm.senderId}
            </div>
            <div className='text-gray-600 mt-1 line-clamp-1'>
              {receivedDm.content}
            </div>
            <div className='text-xs text-gray-500 mt-2'>
              {receivedDm.createdAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
