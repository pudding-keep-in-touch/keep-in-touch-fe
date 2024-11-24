import InboxList from '@/features/messagebox/ui/InboxList'
import InboxLayout from '@/features/messagebox/ui/InboxLayout'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: number }
}) {
  // userId={userId}
  return (
    <InboxLayout>
      <InboxList messageType={type} />
    </InboxLayout>
  )
}
