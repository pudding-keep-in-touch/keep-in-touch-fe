'use client'
import { useEffect, useState } from 'react'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
// import MessageList from '@/features/messagebox/ui/MessageList'
import Link from 'next/link'
import Image from 'next/image'
import {
  Message,
  MessageResponse,
} from '@/features/messagebox/model/messagebox.types'
import unWatchedJson from '@/features/messagebox/ui/lottie/activated.json'
import Lottie from 'lottie-react'
import { useInView } from 'react-cool-inview'

export default function MessagesBlock({
  messageType,
  userId,
  limit,
  order = 'desc',
}: {
  messageType: MessageType
  userId: number
  limit?: number
  order: string
}) {
  const [cursor, setCursor] = useState<string | null>(null)
  const [messages, setMessages] = useState<MessageResponse>()
  const [hasMore, setHasMore] = useState(true)

  const { data, isLoading, isError, error } = useGetMessageList({
    userId,
    type: messageType,
    cursor,
    limit,
    order,
  })

  useEffect(() => {
    if (data?.messageList) {
      const newMessageList = data.messageList
      setMessages((prev) => {
        const newResponse: MessageResponse = {
          receivedMessageCount:
            data.receivedMessageCount || prev?.receivedMessageCount,
          sentMessageCount: data.sentMessageCount || prev?.sentMessageCount,
          unreadMessageCount:
            data.unreadMessageCount || prev?.unreadMessageCount,
          nextCursor: data.nextCursor ?? prev?.nextCursor ?? null,
          messageList: cursor
            ? [...(prev?.messageList || []), ...newMessageList]
            : newMessageList,
        }
        return newResponse
      })
      setHasMore(!!data.nextCursor)
    }
  }, [data, cursor])

  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorStatus = (error as any)?.response?.status
      console.error(`Error fetching messages. Status: ${errorStatus}`)
    }
  }, [isError, error])

  // useInView로 마지막 아이템 감지하고, 더 데이터가 있을 때 & 로딩중이 아닐 때 & data의 nextCursor 값이 있을 때 setCursor에 nextCursor 부여
  const { observe } = useInView({
    onEnter: () => {
      if (hasMore && !isLoading && data?.nextCursor) {
        setCursor(data?.nextCursor)
      }
    },
  })

  const messageCount =
    messageType === 'sent'
      ? data?.sentMessageCount || 0
      : data?.receivedMessageCount || 0

  const moreLink = messageCount > 3 && (
    <Link
      href={`/messagebox/${userId}/${messageType}`}
      className='flex items-center gap-[9px]'
    >
      <p className='text-[#6B7684]'>더보기</p>
      <Image src='/nav_icon.svg' alt='watch more' width={18} height={18} />
    </Link>
  )

  const description =
    messageType === 'sent' ? '아직 보낸 퐁이 없어요!' : '아직 받은 퐁이 없어요!'

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
    <div className='max-w-[390px] px-6 w-full min-h-[368px]'>
      <div className='w-full h-[67px] flex items-center justify-between gap-1'>
        <h2 className='font-semibold text-[18px] flex items-center gap-2'>
          <div>{messageType === 'sent' ? '보낸 퐁' : '받은 퐁'}</div>
          <div>({messageCount})</div>
        </h2>
        {moreLink}
      </div>
      <div>
        {messages?.messageList.map((message: Message, index: number) => {
          const isMessageNormal = !message.status || message.status === 'normal'
          const isReceived = messageType === 'received'
          const isUnread = !message.readAt
          const isLastItem = index === (messages?.messageList.length || 0) - 1
          const messageContent = isReceived
            ? message.readAt === null
              ? '소중한 진심을 확인해보세요'
              : message.content
            : message.content

          const messageClassName = `relative ${!isReceived || !isUnread ? '' : 'border border-[#35b6ff]'} bg-white w-full rounded-2xl h-[106px] items-start flex justify-start pl-[20px] pr-[27px] py-[18px] gap-4 mb-3`
          return (
            <div key={message.messageId} ref={isLastItem ? observe : null}>
              <Link
                href={`/messagebox/${userId}/${messageType}/${message.messageId}`}
              >
                {isMessageNormal ? (
                  <div className={messageClassName}>
                    <div className='relative w-[49px] h-[49px] rounded-lg bg-gradient-to-br from-[#BEAFFB] to-[#F975F0]'>
                      <Lottie animationData={unWatchedJson} loop={0} />
                      {isUnread && (
                        <div className='absolute leading-[27.2%] border border-white px-[6px] py-[5px] -tracking-widest bottom-[1.1rem] right-[0.3rem] bg-white opacity-[80%] rounded-2xl text-[8px] text-gray-4 font-semibold flex justify-center'>
                          읽지 않음
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col'>
                      <div className='text-[#333D4B] font-semibold text-[17px] mb-[4px] leading-none'>
                        {isReceived ? '퐁이 도착했어요!' : '퐁을 보냈어요!'}
                      </div>
                      <div className='text-gray-3 text-[14px] h-[20px] leading-[130%] tracking-[-0.75px]'>
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
                          {message.createdAt &&
                            formattedDate(message.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          )
        })}

        {isLoading && <div>Loading...</div>}
        {!hasMore && <div>더 이상 메시지가 없습니다.</div>}
      </div>
    </div>
  )
}
