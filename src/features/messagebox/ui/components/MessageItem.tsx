import QuestionBox from '@/features/messagebox/ui/components/QuestionBox'
import MessageBoard from '@/features/messagebox/ui/components/MessageBoard'
import { MessageDetail } from '@/features/messagebox/_detail/model/messagebox.types'

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
