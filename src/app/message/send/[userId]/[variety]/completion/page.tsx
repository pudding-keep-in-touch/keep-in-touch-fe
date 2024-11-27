import MessageSendButtons from '@/features/message/_send/_completion/ui/buttons'
import MessageSendPreview from '@/features/message/_send/_completion/ui/preview'
import MessageSendStep from '@/features/message/_send/ui/step'

export default function Page({
  params: { variety, userId },
}: {
  params: { variety: string; userId: string }
}) {
  return (
    <>
      <div className='mt-[30px] mb-5'>
        <MessageSendStep active={3} />
      </div>

      <p className='font-medium text-lg mb-10 text-center'>
        쪽지가 완성되었습니다.
        <br />
        미리보기로 내용을 확인하세요!
      </p>

      <MessageSendPreview userId={userId} />
      <MessageSendButtons variety={variety} userId={userId} />
    </>
  )
}
