'use client'
import InboxLayout from '@/features/messagebox/_detail/ui/layouts/InboxLayout'
// import InboxList from '@/features/messagebox/ui/InboxList'
import { NavigationBar } from '@/shared/ui/layouts/NavigationBar'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
// import { useGetMessageListProps } from '@/features/messagebox/model/messagebox.types'

import { useState } from 'react'
import MessageItem from '@/features/messagebox/ui/MessageItem'

interface InboxProps {
  userId: number
}

export default function Inbox({ userId }: InboxProps) {
  const [cursor, setCursor] = useState<Date>()
  const { data } = useGetMessageList({
    userId,
    type: 'received',
    cursor,
    limit: 10,
    order: 'desc',
  })
  return (
    <InboxLayout title={'쪽지함'}>
      <div className='w-full h-[67px] flex items-center gap-[10px]'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          받은 쪽지
        </h2>
        <div>{data?.received_message_count || 0}</div>
      </div>
      {/* <InboxList userId={userId} /> */}
      {data?.messageList.map((message) => (
        <MessageItem key={message.messageId} messageId={message.messageId} />
      ))}
      <NavigationBar />
    </InboxLayout>
  )
}
