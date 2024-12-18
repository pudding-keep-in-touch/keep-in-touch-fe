'use client'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import Link from 'next/link'
import Image from 'next/image'
import {
  Message,
  MessageResponse,
} from '@/features/messagebox/model/messagebox.types'
import unWatchedJson from '@/features/messagebox/ui/lottie/activated.json'
import Lottie from 'lottie-react'

interface MessageListProps {
  userId: string
  messageType: MessageType
  messages?: MessageResponse
  observe?: (node: HTMLElement | null) => void
}
export default function MessageList({
  userId,
  messageType,
  messages,
  observe,
}: MessageListProps) {
  const dateFormat = (e: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }

    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(e).replace(' ', '').replace(',', '')
  }
  const formattedDate = (createdAt: Date) => {
    const date = new Date(createdAt)
    if (isNaN(date.getTime())) {
      return '유효하지 않은 날짜' // null일 경우 처리
    }
    return dateFormat(date)
  }
  return (
    <>
      {messages?.messageList.map((message: Message, index: number) => {
        const isMessageNormal = !message.status || message.status === 'normal'
        const isReceived = messageType === 'received'
        const isUnread = !message.readAt
        const isLastItem = index === messages?.messageList.length - 1
        const messageContent = isReceived
          ? message.readAt === null
            ? '소중한 진심을 확인해보세요'
            : message.content
          : message.content

        const messageClassName = `relative ${isReceived && isUnread && 'border border-[#35b6ff]'} bg-white w-full rounded-2xl h-[106px] items-start flex justify-start pl-[20px] pr-[27px] py-[18px] gap-4 mb-3`
        return (
          <div key={message.messageId} ref={isLastItem ? observe : null}>
            <Link
              href={`/messagebox/${userId}/${messageType}/${message.messageId}`}
            >
              {isMessageNormal ? (
                <div className={messageClassName}>
                  <div className='relative w-[49px] h-[49px] rounded-lg bg-gradient-to-br from-[#BEAFFB] to-[#F975F0]'>
                    <Lottie animationData={unWatchedJson} loop={0} />
                    {isReceived && isUnread && (
                      <div className='absolute leading-[27.2%] border border-white px-[6px] py-[5px] -tracking-widest bottom-[1.1rem] right-[0.3rem] bg-white opacity-[80%] rounded-2xl text-[8px] text-gray-4 font-semibold flex justify-center'>
                        읽지 않음
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col w-[230px]'>
                    <div className='text-[#333D4B] font-semibold text-[17px] mb-[4px] leading-none'>
                      {isReceived ? '퐁이 도착했어요!' : '퐁을 보냈어요!'}
                    </div>
                    <div className='text-gray-3 text-ellipsis whitespace-nowrap break-all overflow-hidden text-[14px] h-[20px] leading-[130%] tracking-[-0.75px]'>
                      {messageContent}
                    </div>
                    <div className='text-[#C5C5C5] font-medium h-[14px] text-[12px] mt-[14px]'>
                      {message.createdAt && formattedDate(message.createdAt)}
                    </div>
                  </div>
                  {isUnread && isReceived && (
                    <div className='absolute top-0 right-0 m-[14px] w-[8px] h-[8px] bg-[#FF5F5F] rounded-full'></div>
                  )}
                </div>
              ) : (
                <div className='w-full'>
                  <div className='relative bg-white w-full rounded-2xl flex items-center h-[75px] gap-[16px] px-[20px] py-[13px] mb-[12px]'>
                    <Image
                      src='/hidden.svg'
                      alt='hidden message'
                      width={49}
                      height={49}
                    />
                    <div className='flex flex-col justify-between gap-2'>
                      <div className='text-[#6B7684] font-semibold text-[17px] h-[20px] leading-none'>
                        숨김 처리되었습니다.
                      </div>
                      <div className='text-[#C5C5C5] font-medium h-[14px] text-[12px]'>
                        {message.createdAt && formattedDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </div>
        )
      })}
    </>
  )
}
