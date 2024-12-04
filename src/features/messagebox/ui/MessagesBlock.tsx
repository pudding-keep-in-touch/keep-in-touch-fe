'use client'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { useEffect, useRef, useState } from 'react'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageList from '@/features/messagebox/ui/MessageList'
import Link from 'next/link'
import Image from 'next/image'
import { Message } from '@/features/messagebox/model/messagebox.types'
export default function MessagesBlock({
  messageType,
  userId,
  limit,
}: {
  messageType: MessageType
  userId: number
  limit?: number
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [cursor, setCursor] = useState<Date | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const { data, error, isLoading } = useGetMessageList({
    userId,
    type: messageType,
    cursor,
    limit,
  })
  useEffect(() => {
    if (data) {
      setMessages((prev) => [...prev, ...data.messageList]) // 쪽지 데이터 추가
      setHasMore(!!data.nextCursor) // 다음 커서가 있으면 더보기 가능
      setCursor(data.nextCursor) // 다음 요청을 위한 nextCursor 설정
    }
  }, [data])

  const handleScroll = () => {
    if (!hasMore || isLoading) return
    const container = containerRef.current
    if (container) {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 10
      ) {
        setCursor((prev) => prev)
      }
    }
  }
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [hasMore, isLoading])

  if (isLoading) return <div>loading..</div>
  if (error) return <div>Error fetching message details.</div>
  if (!data) return null

  const messageCount =
    messageType === 'sent'
      ? data.sentMessageCount
      : data.receivedMessageCount || 0

  const moreLink = messageCount! > 3 && (
    <Link
      href={`/messagebox/${userId}/${messageType}`}
      className='flex items-center gap-[9px]'
    >
      <p className=' text-[#6B7684]'>더보기</p>
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
      {messageCount! > 0 ? (
        <MessageList data={data} userId={userId} messageType={messageType} />
      ) : (
        <div className='flex flex-col items-center text-[#333D4B] pb-[162px] pt-[110px]'>
          <Image src='/no_msg.svg' alt='home_icon' width={65} height={57} />
          <p className='leading-none pt-[11px] text-[17px]'>{description}</p>
        </div>
      )}
    </div>
  )
}
