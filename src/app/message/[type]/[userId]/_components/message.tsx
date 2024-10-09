'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn, EmotionVariety, getEmotionVarietyData } from '@/shared/lib/utils'
import { ChevronLeftIcon } from 'lucide-react'

import { useInView } from 'react-cool-inview'
import React, { useEffect, useState } from 'react'
import { DmList } from '@/entities/message/model/types'
import { useGetInfiniteMessages } from '@/entities/message/api/queries'
import { MessageType, VarietyType } from '@/shared/types'

interface MessageListProps {
  userId: number
  messageType: MessageType
}

export default function MessageList({ userId, messageType }: MessageListProps) {
  const router = useRouter()
  const param = useSearchParams()
  const baseUrl = param.get('base')
  const { observe, inView } = useInView()

  const { data, fetchNextPage, isLoading } = useGetInfiniteMessages({
    userId,
    limit: 10,
    type: messageType,
  })

  const allMessages =
    data?.pages && (data.pages.flatMap((page) => page || []) as DmList[])

  const backHandler = () => {
    if (baseUrl) {
      router.replace(`/home`)
    } else {
      router.back()
    }
  }

  useEffect(() => {
    if (inView) {
      console.log('inview', inView)
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  return (
    <>
      <header className='w-full h-[50px] grid grid-cols-3 items-center px-6'>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={backHandler}
        />
        {!isLoading && (
          <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
            {messageType === 'sent' ? '보낸 쪽지' : '받은 쪽지'}
          </h1>
        )}
      </header>
      <div className='w-full flex flex-col gap-2 py-10 px-6'>
        {allMessages &&
          allMessages.map((message) => (
            <MessageItem
              key={message.id}
              baseUrl={baseUrl || ''}
              messageType={messageType}
              {...message}
            />
          ))}
        <div ref={observe} />
      </div>
    </>
  )
}

type MessageItemProps = DmList & {
  baseUrl?: string
  messageType: MessageType
}

function MessageItem({
  messageType,
  baseUrl,
  ...messageProps
}: MessageItemProps) {
  const { id, receiverId, content, emotion, isRead, createdAt } = messageProps
  const [emotionType, setEmotionType] = useState<VarietyType>()
  const pathname = usePathname()
  const router = useRouter()

  const emotionUrl = getEmotionVarietyData(
    emotion.name as EmotionVariety | undefined
  )

  const onClick = () => {
    if (baseUrl) {
      router.push(`${pathname}/${emotionType}/${id}?base=${baseUrl}`)
    } else {
      router.push(`${pathname}/${emotionType}/${id}`)
    }
  }

  useEffect(() => {
    if (emotion.name === '응원과 감사') {
      setEmotionType('thanks')
    } else {
      setEmotionType('honestTalk')
    }
  }, [emotion.name])

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
              emotion.name === '응원과 감사' ? 'bg-[#D7F1FF]' : 'bg-[#FFDDFE]'
            )}
          >
            <span className='text-[10px] text-[#1F1F1F] font-medium'>
              {emotion.name}
            </span>
          </div>
        </div>
        <div>
          <div className='font-semibold text-[#333D4B] text-[17px]'>
            {messageType === 'received'
              ? '익명에게 쪽지가 도착했습니다!'
              : `To. ${receiverId}에게`}
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
