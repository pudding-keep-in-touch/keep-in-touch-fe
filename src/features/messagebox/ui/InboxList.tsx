'use client'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { useState } from 'react'
import MessageItem from '@/features/messagebox/ui/MessageItem'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import Link from 'next/link'

const userMockData = { userId: 1, nickname: 'jieun' }
// userId, , userId: number props로 mockdata 제거하고 추가
export default function InboxList({
  messageType,
}: {
  messageType: MessageType
}) {
  const [cursor, setCursor] = useState<Date>()
  const { data } = useGetMessageList({
    userId: userMockData.userId, // mockData, api 추가되면 수정 필요
    type: messageType,
    cursor,
    limit: 10,
    order: 'desc',
  })

  return (
    <div className='w-full'>
      <div className='w-full h-[67px] flex items-center gap-[10px]'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          {messageType === 'sent' ? '보낸 쪽지함' : '받은 쪽지함'}
        </h2>
        <div>{data?.received_message_count || 0}</div>
      </div>
      {data?.messageList.map((message) => (
        <div key={message.messageId}>
          <Link
            href={`/messagebox/${userMockData.userId}/${messageType}/${message.messageId}`}
            className='flex items-center gap-[9px]'
          >
            <MessageItem messageId={message.messageId} />
          </Link>
        </div>
      ))}
    </div>
  )
}
