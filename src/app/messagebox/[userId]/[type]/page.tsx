// import { MessageType } from "@/shared/types/common.types";
import InboxList from '@/features/messagebox/ui/InboxList'
// import InboxLayout from "@/features/messagebox/_detail/ui/layouts/InboxLayout";
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'

export default function Page({
  params: { type, userId },
}: {
  params: { type: MessageType; userId: number }
}) {
  return (
    // <InboxLayout messageType={type}>
    <InboxList messageType={type} userId={userId} />
    // {/* </InboxLayout> */}
  )
}
