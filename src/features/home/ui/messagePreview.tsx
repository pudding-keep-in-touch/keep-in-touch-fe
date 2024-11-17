'use client'

import Image from 'next/image'
import { ChevronRightIcon } from 'lucide-react'
import {
  cn,
  EmotionVariety,
  getEmotionVarietyData,
} from '@/shared/utils/emotionVariety'
import { DirectMessage, MessageType } from '@/shared/types/common.types'
import Link from 'next/link'
interface MessagePreviewProps {
  dmList?: DirectMessage
  title: string
  type: MessageType
  userId: number
}

export default function MessagePreview({
  dmList,
  title,
  type,
  userId,
}: MessagePreviewProps) {
  const emotionUrl = getEmotionVarietyData(
    dmList?.emotion.name as EmotionVariety | undefined
  )

  return (
    <div className='w-full rounded-2xl bg-white overflow-hidden'>
      <div className='w-full h-[60px] bg-[#F6F7FC] p-5 flex justify-between items-center'>
        <div className='flex gap-2'>
          <h1 className='text-xl font-medium'>{title}</h1>
          {dmList && dmList.isRead === false && type === 'received' && (
            <div className='flex justify-center items-center h-8 bg-[#3182F6] p-2 rounded-full'>
              <p className='text-white text-[13px] font-normal'>
                새로운 쪽지를 받았어요!
              </p>
            </div>
          )}
        </div>

        {dmList && (
          <Link href={`/message/${type}/${userId}?base=home`}>
            <ChevronRightIcon className='w-6 h-6 cursor-pointer' />
          </Link>
        )}
      </div>
      <div className='w-full h-[130px] px-5 py-7 bg-white'>
        {dmList ? (
          <div className='flex gap-5'>
            <div className='flex flex-col w-[54px] h-[54px] shrink-0 gap-1'>
              <Image
                className='bg-zinc-300 rounded-lg w-[54px] h-[54px] shrink-0 object-cover'
                src={emotionUrl?.src || ''}
                alt={emotionUrl?.text || dmList.emotion.name}
                width={54}
                height={54}
              />
              <div
                className={cn(
                  'flex justify-center items-center py-[5px] w-full rounded-sm',
                  dmList.emotion.name === '응원과 감사'
                    ? 'bg-[#D7F1FF]'
                    : 'bg-[#FFDDFE]'
                )}
              >
                <span className='text-[10px] text-[#1F1F1F] font-medium'>
                  {dmList.emotion.name}
                </span>
              </div>
            </div>

            <div>
              <div className='font-semibold text-[#333D4B] text-[17px] line-clamp-1 text-base'>
                {type === 'received'
                  ? '익명에게 쪽지가 도착했습니다!'
                  : `To. ${dmList.receiverId}에게`}
              </div>
              <div className='text-[#333D4B] mt-1 line-clamp-1 text-base'>
                {dmList.content}
              </div>
              <div className='text-xs text-[#6B7684] mt-2 text-[13px] line-clamp-1 text-base'>
                {dmList.createdAt}
              </div>
            </div>
          </div>
        ) : (
          <div className='flex justify-center items-center h-full'>
            <p className='text-[#C5C5C5] text-lg font-medium'>
              {type === 'sent' ? '보낸 쪽지' : '받은 쪽지'}가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
