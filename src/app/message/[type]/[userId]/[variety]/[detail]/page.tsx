import MessageBoard from './_components/board'
import { MessageType, VarietyType } from '@/shared/types'
import MessageDetailLayout from '@/shared/ui/layouts/MessageDetailLayout'

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
