import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
// import { useGetMessageListProps } from '@/features/messagebox/model/messagebox.types'
import MessageItem from './MessageItem'
import { useState, useEffect } from 'react'

interface InboxProps {
  userId: number
}

export default function InboxList({ userId }: InboxProps) {
  const [cursor, setCursor] = useState<Date>() // 초기 cursor 설정
  const { data } = useGetMessageList({
    userId,
    type: 'received',
    cursor,
    limit: 10,
    order: 'desc',
  })
  // useEffect(() => {
  //   // 데이터의 nextCursor 값에 따라 cursor 업데이트
  //   if (data && data.nextCursor) {
  //     setCursor(new Date(data.nextCursor)) // 다음 요청을 위한 cursor 업데이트
  //   } else {
  //     setCursor(undefined) // 더 이상 요청할 데이터가 없다면 cursor를 null로 설정
  //   }
  // }, [data]) // data가 변경될 때 마다 실행

  // Handle loading and error states
  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  // if (status === 'error') {
  //   return <div>Error fetching messages.</div>;
  // }

  console.log(data?.received_message_count)
  return (
    <div>
      <div>받은거Total number: {data?.received_message_count || 0}</div>
      {data?.messageList.map((message) => (
        <MessageItem key={message.messageId} messageId={message.messageId} />
      ))}
    </div>
  )
}
