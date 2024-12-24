import InboxLayout from '@/features/messagebox/ui/layouts/InboxLayout'
import { MessageType } from '@/shared/types/common.types'
import MessagesBlock from '@/features/messagebox/ui/components/MessagesBlock'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: string }
}) {
  // messageType이 아닌 url 접근 처리 필요

  return (
    <InboxLayout title={'My 퐁'} userId={userId} messageType={type}>
      <MessagesBlock messageType={type} userId={userId} />
    </InboxLayout>
  )
}
