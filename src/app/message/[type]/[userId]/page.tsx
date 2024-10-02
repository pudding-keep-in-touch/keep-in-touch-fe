import { MessageType } from '@/shared/types'
import MessageList from './_components/message'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: number }
}) {
  return <MessageList messageType={type} userId={userId} />
}
