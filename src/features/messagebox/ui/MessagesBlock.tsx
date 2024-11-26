'use client'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { useState } from 'react'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import InboxList from './InboxList'

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
    <div className='max-w-[390px] px-6'>
      <div className='w-full h-[67px] flex items-center gap-1'>
        <h2 className='font-semibold text-[18px] flex items-center gap-2'>
          <div>{messageType === 'sent' ? '보낸 퐁' : '받은 퐁'}</div>
          <div>({data?.receivedMessageCount || 0})</div>
        </h2>
      </div>
      <InboxList data={data} userId={userId} messageType={messageType} />
    </div>
  )
}
