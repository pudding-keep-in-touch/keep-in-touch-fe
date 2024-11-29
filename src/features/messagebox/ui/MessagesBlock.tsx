'use client'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { useState } from 'react'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageList from '@/features/messagebox/ui/MessageList'
import Link from 'next/link'
import Image from 'next/image'
export default function MessagesBlock({
  messageType,
  userId,
}: {
  messageType: MessageType
  userId: number
}) {
  const [cursor, setCursor] = useState<Date>()
  const { data, error, isLoading } = useGetMessageList({
    userId,
    type: messageType,
    cursor,
    limit: 10,
    order: 'desc',
  })
  if (isLoading) return <div>임시 로딩중</div>
  if (error) return <div>Error fetching message details.</div>
  if (!data) return null

  return (
    <div className='max-w-[390px] px-6 w-full'>
      <div className='w-full h-[67px] flex items-center justify-between gap-1'>
        <h2 className='font-semibold text-[18px] flex items-center gap-2'>
          <div>{messageType === 'sent' ? '보낸 퐁' : '받은 퐁'}</div>
          <div>
            (
            {messageType === 'sent'
              ? data?.sentMessageCount
              : data?.receivedMessageCount || 0}
            )
          </div>
        </h2>
        {data.receivedMessageCount! > 3 && (
          <Link
            href={`/messagebox/${userId}/received`}
            className='flex items-center gap-[9px]'
          >
            <p className=' text-[#6B7684]'>더보기</p>
            <Image
              src='/nav_icon.svg'
              alt='watch more'
              width={18}
              height={18}
            />
          </Link>
        )}
      </div>
      <MessageList data={data} userId={userId} messageType={messageType} />
    </div>
  )
}
