'use client'
// 이거 안하면 Error: (0 , _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery) is not a function
import { useGetMessageDetail } from '@/features/messagebox/_detail/api/detailQuery'

//  messageType,  messageType: MessageType
export default function MessageDetail({ messageId }: { messageId: number }) {
  const { data, isLoading, error } = useGetMessageDetail({ messageId })

  if (isLoading) return <div>임시 로딩중.</div>
  if (error) return <div>Error fetching message details.</div>
  if (!data) return null

  return (
    <div>
      <h2>{data.receiverNickname}</h2>
      <div>
        <p>{data.question?.content}</p>
      </div>
      <p>{data.content}</p>
      <div>
        {data.reactions.map((reaction) => (
          <p key={reaction.reactionId}>{reaction.content}</p>
        ))}
      </div>
    </div>
  )
}
