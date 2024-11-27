import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import InboxLayout from '@/features/messagebox/ui/InboxLayout'
import ReactionPage from '@/features/messagebox/ui/ReactionPage'

export default function Page({
  params: { userId, type, messageId },
}: {
  params: { userId: number; type: MessageType; messageId: number }
}) {
  // /reaction, /report, /hide 제외 나머지 페이지 예외 처리 필요
  return (
    <InboxLayout title={'반응 보내기'}>
      <ReactionPage messageType={type} userId={userId} messageId={messageId} />
    </InboxLayout>
  )
}
