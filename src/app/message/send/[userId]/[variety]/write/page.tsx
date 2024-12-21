import MessageInput from '@/features/message/_send/_write/ui/messageInput'
import MessageWriteNextButton from '@/features/message/_send/_write/ui/nextButton'
import MessageSendStep from '@/features/message/_send/ui/step'

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  return (
    <>
      <div className='mt-[30px] mb-5'>
        <MessageSendStep active={2} />
      </div>

      <p className='font-medium text-lg mb-10'>내용을 작성하세요.</p>

      <MessageInput />

      <MessageWriteNextButton userId={userId} />
    </>
  )
}
