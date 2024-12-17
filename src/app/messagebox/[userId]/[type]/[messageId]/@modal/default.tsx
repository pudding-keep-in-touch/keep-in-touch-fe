import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageDetail from '@/features/messagebox/ui/MessageDetail'

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
