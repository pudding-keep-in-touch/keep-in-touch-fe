'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useInView } from 'react-cool-inview'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'

import MessageList from '@/features/messagebox/ui/components/MessageList'
import { MessageType } from '@/shared/types/common.types'
import { MessageResponse } from '@/features/messagebox/_detail/model/messagebox.types'
import { Spinner } from '@/shared/components/Spinner'

export default function MessagesBlock({
  type,
  userId,
}: {
  type: MessageType
  userId: string
}) {
  const [cursor, setCursor] = useState<Date | null>(null)
  const [messages, setMessages] = useState<MessageResponse>()
  const [hasMore, setHasMore] = useState(true)

  const { data, isLoading } = useGetMessageList({
    userId,
    type,
    cursor,
    limit: 10,
    order: 'desc',
  })

  useEffect(() => {
    if (data?.messageList) {
      const newMessageList = data.messageList
      setMessages((prev) => {
        const updatedMessageList = cursor
          ? [
              ...(prev?.messageList || []),
              ...newMessageList.filter(
                (newMsg) =>
                  !(prev?.messageList || []).some(
                    (prevMsg) => prevMsg.messageId === newMsg.messageId
                  )
              ),
            ]
          : newMessageList

        return {
          receivedMessageCount:
            data.receivedMessageCount || prev?.receivedMessageCount,
          sentMessageCount: data.sentMessageCount || prev?.sentMessageCount,
          unreadMessageCount:
            data.unreadMessageCount || prev?.unreadMessageCount,
          nextCursor: data.nextCursor ?? prev?.nextCursor ?? null,
          messageList: updatedMessageList,
        }
      })

      setHasMore(!!data.nextCursor)
    }
  }, [data, cursor])

  const { observe } = useInView({
    onEnter: () => {
      if (hasMore && !isLoading && data?.nextCursor) {
        setCursor(data.nextCursor)
      }
    },
  })

  const messageCount =
    type === 'sent'
      ? data?.sentMessageCount || 0
      : data?.receivedMessageCount || 0

  const description =
    type === 'sent' ? '아직 보낸 퐁이 없어요!' : '아직 받은 퐁이 없어요!'

  return (
    <div className='max-w-[390px] w-full bg-[#F7F7FC]'>
      <div className='w-full h-[67px] flex items-center justify-between gap-1  px-6 '>
        <h2 className='font-semibold text-[18px] flex items-center gap-2'>
          <div>{type === 'sent' ? '보낸 퐁' : '받은 퐁'}</div>
          <div>({messageCount})</div>
        </h2>
      </div>
      <div className='max-w-[390px] px-6 w-full min-h-[368px] h-full'>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='h-full'>
            {messageCount > 0 ? (
              <MessageList
                messages={messages}
                userId={userId}
                type={type}
                observe={observe}
              />
            ) : (
              <div className='flex flex-col items-center text-[#333D4B] pb-[162px] pt-[110px]'>
                <Image
                  src='/no_msg.svg'
                  alt='home_icon'
                  width={65}
                  height={57}
                />
                <p className='leading-none pt-[11px] text-[17px]'>
                  {description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
