'use client'
// 이거 안하면 Error: (0 , _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery) is not a function
import { useGetMessageDetail } from '@/features/messagebox/_detail/api/detailQuery'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import Link from 'next/link'
//  messageType,  messageType: MessageType
export default function MessageDetail({
  userId,
  messageId,
  messageType,
}: {
  userId: number
  messageId: number
  messageType: MessageType
}) {
  const { data, isLoading, error } = useGetMessageDetail({ messageId })

  if (isLoading) return <div>임시 로딩중.</div>
  if (error) return <div>Error fetching message details.</div>
  if (!data) return null

  return (
    <div>
      <div>
        <p>질문</p>
        <div>{data.question?.content}</div>
      </div>
      <div>
        <p>{data.receiverNickname}</p>
        <div>{data.content}</div>
      </div>
      {messageType === 'received' && data.reactions.length === 0 ? (
        <Link
          href={`/messagebox/${userId}/${messageType}/${messageId}/reaction`}
          className='h-fit p-4 bg-[#000000] text-white rounded-2xl font-bold mt-80 w-full'
        >
          반응보내기
        </Link>
      ) : (
        <div>
          {data.reactions.map((reaction) => (
            <p key={reaction.reactionId}>{reaction.content}</p>
          ))}
        </div>
      )}
    </div>
  )
}
