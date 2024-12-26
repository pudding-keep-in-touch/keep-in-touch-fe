import { MessageType } from '@/shared/types/common.types'
import MessageDetail from '@/features/messagebox/ui/components/MessageDetail'

export default function ModalDefaultPage({
  params: { userId, type, messageId },
}: {
  params: {
    userId: string
    type: MessageType
    messageId: string
  }
}) {
  return (
    <MessageDetail userId={userId} messageId={messageId} messageType={type} />
  )
}
