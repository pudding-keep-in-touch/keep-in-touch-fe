import InboxLayout from '@/features/messagebox/ui/layouts/InboxLayout'
import { MessageType } from '@/shared/types/common.types'
import MessagesBlock from '@/features/messagebox/ui/components/MessagesBlock'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: string }
}) {
  return (
    <InboxLayout title={'My 퐁'} userId={userId} type={type}>
      <MessagesBlock type={type} userId={userId} />
    </InboxLayout>
  )
}
