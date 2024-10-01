'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn, EmotionVariety, getEmotionVarietyData } from '@/shared/lib/utils'
import { ChevronLeftIcon } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { DmList } from '@/entities/message/model/types'
import { useGetInfiniteMessages } from '@/entities/message/api/queries'

export type varietyType = 'sent' | 'received'

interface MessageListProps {
  userId: number
  variety: varietyType
}

export default function MessageList({ userId, variety }: MessageListProps) {
  const router = useRouter()
  const param = useSearchParams()
  const baseUrl = param.get('base')

  const { data, fetchNextPage, refetch } = useGetInfiniteMessages({
    userId,
    limit: 10,
    type: variety,
  })
  const { ref, inView } = useInView()

  const [dmList, setDmList] = useState<DmList[]>([])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  useEffect(() => {
    refetch()
    if (data?.pages) {
      const allMessages = data.pages.flatMap((page) => page || [])
      setDmList(allMessages)
    }
  }, [data, refetch])

  const backHandler = () => {
    if (baseUrl) {
      router.replace(`/home`)
    } else {
      router.back()
    }
  }

  console.log('variety', variety)
  console.log('dmList', dmList)

  return (
    <>
      <header className='w-full h-[50px] grid grid-cols-3 items-center px-6'>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={backHandler}
        />
        <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
          {variety === 'sent' ? '보낸 쪽지' : '받은 쪽지'}
        </h1>
      </header>
      <div ref={ref} className='w-full flex flex-col gap-2 py-10 px-6'>
        {dmList &&
          dmList.map((message, index) => (
            <MessageItem
              key={message.id}
              baseUrl={baseUrl || ''}
              {...message}
            />
          ))}
      </div>
    </>
  )
}

type MessageItemProps = DmList & {
  baseUrl?: string
}

function MessageItem({ baseUrl, ...messageProps }: MessageItemProps) {
  const { id, senderId, content, emotion, isRead, createdAt } = messageProps
  const pathname = usePathname()
  const router = useRouter()

  const emotionUrl = getEmotionVarietyData(
    emotion.name as EmotionVariety | undefined
  )

  const onClick = () => {
    if (baseUrl) {
      router.push(`${pathname}/${id}?base=${baseUrl}`)
    } else {
      router.push(`${pathname}/${id}`)
    }
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'px-5 py-4 rounded-2xl mb-2 cursor-pointer bg-white',
        !isRead && 'outline outline-2 outline-[#35B6FF]'
      )}
    >
      <div className='flex gap-5'>
        <div className='flex flex-col w-[54px] h-[54px] shrink-0 gap-1'>
          <Image
            className='bg-zinc-300 rounded-lg w-[54px] h-[54px] shrink-0 object-cover'
            src={emotionUrl?.src || ''}
            alt={emotionUrl?.text || emotion.name}
            width={54}
            height={54}
          />
          <div
            className={cn(
              'flex justify-center items-center py-[5px] w-full rounded-sm',
              emotion.name === '응원과감사' ? 'bg-[#D7F1FF]' : 'bg-[#FFDDFE]'
            )}
          >
            <span className='text-[10px] text-[#1F1F1F] font-medium'>
              {emotion.name}
            </span>
          </div>
        </div>
        <div>
          <div className='font-semibold text-[#333D4B] text-[17px]'>
            {senderId}
          </div>
          <div className='text-[#333D4B] mt-1 line-clamp-1 text-base'>
            {content}
          </div>
          <div className='text-xs text-[#6B7684] mt-2 text-[13px]'>
            {createdAt}
          </div>
        </div>
      </div>
    </div>
  )
}
