'use client'
import Link from 'next/link'
import Image from 'next/image'
import {
  Message,
  MessageResponse,
} from '@/features/messagebox/model/messagebox.types'
import { MessageType } from '@/shared/types/common.types'
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
      return '유효하지 않은 날짜'
    }
    return dateFormat(date)
  }
  return (
    <>
      {messages?.messageList.map((message: Message, index: number) => {
        const isReceived = messageType === 'received'
        const isMessageNormal = !message.status || message.status === 'normal'
        const isUnreadReaction =
          !isReceived &&
          message.reactionInfo &&
          message.reactionInfo?.readAt === null
        const isUnread = isReceived && !message.readAt
        const isLastItem = index === messages?.messageList.length - 1
        const messageContent =
          isReceived && message.readAt === null
            ? '소중한 진심을 확인해보세요'
            : isUnreadReaction
              ? '친구의 감정 이모지를 확인해보세요'
              : message.content

        const messageClassName = `relative ${(isUnreadReaction || isUnread) && 'border border-[#35b6ff]'} bg-white w-full rounded-2xl h-[106px] items-start flex justify-start pl-[20px] pr-[27px] py-[18px] mb-3`
        return (
          <div key={message.messageId} ref={isLastItem ? observe : null}>
            <Link
              href={`/messagebox/${userId}/${messageType}/${message.messageId}`}
            >
              {isMessageNormal ? (
                <div className={messageClassName}>
                  <div className='absolute w-[49px] h-[49px] rounded-lg bg-gradient-to-br  from-[#BEAFFB] to-[#F975F0]'>
                    <Lottie animationData={unWatchedJson} loop={0} />
                    {(isUnreadReaction || isUnread) && (
                      <div className='relative leading-[27.2%] border border-white h-3 items-center mx-1 -tracking-widest bottom-[30px]  bg-white opacity-[80%] rounded-2xl text-[8px] text-gray-4 font-semibold flex justify-center'>
                        읽지 않음
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col min-w-[200px] max-w-[230px] ml-16'>
                    <div className='text-[#333D4B] font-semibold text-[17px] mb-[4px] leading-none'>
                      {isReceived
                        ? '퐁이 도착했어요!'
                        : isUnreadReaction
                          ? '친구가 내 퐁에 반응했어요!'
                          : '퐁을 보냈어요!'}
                    </div>
                    <div className=' text-gray-3 text-ellipsis whitespace-nowrap break-all overflow-hidden text-[14px] h-[20px] leading-[130%] tracking-[-0.75px]'>
                      {messageContent}
                    </div>
                    <div className='text-[#C5C5C5] font-medium h-[14px] text-[12px] mt-[14px]'>
                      {message.createdAt && formattedDate(message.createdAt)}
                    </div>
                  </div>
                  {(isUnreadReaction || isUnread) && (
                    <div className='absolute top-0 right-0 m-[14px] w-[8px] h-[8px] bg-[#FF5F5F] rounded-full' />
                  )}
                </div>
              ) : (
                <div className='w-full'>
                  <div className='relative bg-white w-full rounded-2xl flex items-center h-[75px] gap-4 px-[20px] py-[13px] mb-[12px]'>
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
