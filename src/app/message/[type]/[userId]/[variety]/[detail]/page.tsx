import MessageBoard from '@/features/message/_detail/ui/board'
import MessageDetailLayout from '@/features/message/_detail/ui/layouts/MessageDetailLayout'
import { MessageType, VarietyType } from '@/shared/types/common.types'

export default function Page({
  params: { type, variety, detail },
}: {
  params: { type: MessageType; variety: VarietyType; detail: string }
}) {
  const directMessageId = Number(detail)
  return (
    <MessageDetailLayout messageType={type} variety={variety}>
      <MessageBoard directMessageId={directMessageId} messageType={type} />
    </MessageDetailLayout>
  )
}
