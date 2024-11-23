import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import ReactionPage from '@/features/messagebox/ui/ReactionPage'

export default function Page({
  params: { userId, type, messageId },
}: {
  params: { userId: number; type: MessageType; messageId: number }
}) {
  // /reaction, /report, /hide 제외 나머지 페이지 예외 처리 필요
  return (
    <ReactionPage
      messageType={type}
      userId={userId}
      messageId={messageId}
    ></ReactionPage>
  )
}
