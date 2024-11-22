// import InboxLayout from "@/features/messagebox/_detail/ui/layouts/InboxLayout";
import ViewAllMessage from '@/features/messagebox/ui/ViewAllMessage'
// import { MessageType } from "@/shared/types/common.types";
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: number }
}) {
  return (
    // <InboxLayout messageType={type}>
    <ViewAllMessage messageType={type} userId={userId} />
    // </InboxLayout >
  )
}
