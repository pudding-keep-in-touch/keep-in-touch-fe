'use client'
import { useEffect, useState } from 'react'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageList from '@/features/messagebox/ui/MessageList'
import Link from 'next/link'
import Image from 'next/image'
import { MessageResponse } from '@/features/messagebox/model/messagebox.types'
import { useInView } from 'react-cool-inview'

export default function MessagesBlock({
  messageType,
  userId,
  limit,
}: {
  messageType: MessageType
  userId: number
  limit?: number
}) {
  const [cursor, setCursor] = useState<string | null>(null)
  const [messages, setMessages] = useState<MessageResponse>()
  const [hasMore, setHasMore] = useState(true)

  const { data, isLoading, isError, error } = useGetMessageList({
    userId,
    type: messageType,
    cursor,
    limit,
    order: 'desc',
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
        {messageCount > 0 ? (
          <MessageList
            messages={messages}
            userId={userId}
            messageType={messageType}
            observe={observe}
          />
        ) : (
          <div className='flex flex-col items-center text-[#333D4B] pb-[162px] pt-[110px]'>
            <Image src='/no_msg.svg' alt='home_icon' width={65} height={57} />
            <p className='leading-none pt-[11px] text-[17px]'>{description}</p>
          </div>
        )}
        {/* // 로딩 페이지로 이후 변경 */}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  )
}
