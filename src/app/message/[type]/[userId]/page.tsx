import { MessageType } from '@/shared/types/common.types'
import MessageList from '../../../../features/message/ui/message'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: number }
}) {
  return <MessageList messageType={type} userId={userId} />
}
