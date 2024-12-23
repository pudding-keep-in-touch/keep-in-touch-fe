import InboxLayout from '@/features/messagebox/ui/InboxLayout'
import ViewAllMessage from '@/features/messagebox/ui/ViewAllMessage'
import { MessageType } from '@/shared/types/common.types'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: string }
}) {
  return (
    <InboxLayout title='My 퐁' userId={userId} messageType={type}>
      <ViewAllMessage messageType={type} userId={userId} />
    </InboxLayout>
  )
}
