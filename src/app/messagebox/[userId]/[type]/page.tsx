import InboxLayout from '@/features/messagebox/ui/InboxLayout'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessagesBlock from '@/features/messagebox/ui/MessagesBlock'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: string }
}) {
  // messageType이 아닌 url 접근 처리 필요

  return (
    <InboxLayout title={'My 퐁'} userId={userId}>
      <MessagesBlock messageType={type} userId={userId} />
    </InboxLayout>
  )
}
