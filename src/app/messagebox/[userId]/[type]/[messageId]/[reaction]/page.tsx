import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import ReactionPage from '@/features/messagebox/ui/ReactionPage'

export default function Page({
  params: { userId, type, messageId },
}: {
  params: { userId: number; type: MessageType; messageId: number }
}) {
  return (
    <ReactionPage
      messageType={type}
      userId={userId}
      messageId={messageId}
    ></ReactionPage>
  )
}
