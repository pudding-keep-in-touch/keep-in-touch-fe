import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageDetail from '@/features/messagebox/ui/MessageDetail'

export default function Page({
  params: { type, messageId },
}: {
  params: { type: MessageType; messageId: number }
}) {
  return <MessageDetail messageId={messageId} messageType={type} />
}
