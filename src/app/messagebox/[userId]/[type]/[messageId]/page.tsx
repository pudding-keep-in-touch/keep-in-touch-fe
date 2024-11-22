import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageDetail from '@/features/messagebox/ui/MessageDetail'

export default function Page({
  params: { userId, type, messageId },
}: {
  params: { userId: number; type: MessageType; messageId: number }
}) {
  return (
    <MessageDetail userId={userId} messageId={messageId} messageType={type} />
  )
}
