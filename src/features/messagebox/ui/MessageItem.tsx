import { useGetMessageDetail } from '@/features/messagebox/_detail/api/detailQuery'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import Link from 'next/link'
import QuestionBox from '@/features/messagebox/_detail/ui/component/QuestionBox'
import MessageBoard from '@/features/messagebox/_detail/ui/component/MessageBoard'
import { MessageDetail } from '@/features/messagebox/model/messagebox.types'

export default function MessageItem({
  data,
  variety,
}: {
  data: MessageDetail
  variety: string
  messageId: string
}) {
  return (
    <>
      {variety === 'bg-messageDetail' && (
        <QuestionBox content={data.question!.content} />
      )}
      <MessageBoard
        receiverNickname={data.receiverNickname}
        content={data.content}
      />
    </>
  )
}
