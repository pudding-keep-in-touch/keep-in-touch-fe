import InboxLayout from '@/features/messagebox/ui/InboxLayout'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessagesBlock from '@/features/messagebox/ui/MessagesBlock'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: number }
}) {
  // userId={userId}
  return (
    <InboxLayout title={`${type}`}>
      <MessagesBlock messageType={type} userId={userId} />
    </InboxLayout>
  )
}
