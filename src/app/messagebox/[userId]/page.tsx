import InboxLayout from '@/features/messagebox/ui/InboxLayout'
import ViewAllMessage from '@/features/messagebox/ui/ViewAllMessage'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: string }
}) {
  return (
    <InboxLayout title='My 퐁' userId={userId}>
      <ViewAllMessage messageType={type} userId={userId} />
    </InboxLayout>
  )
}
