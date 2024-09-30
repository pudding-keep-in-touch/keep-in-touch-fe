import MessageSendStep from '../../_components/step'
import MessageSendButtons from './_components/buttons'
import MessageSendPreview from './_components/preview'

export default function Page({
  params: { variety, userId },
}: {
  params: { variety: string; userId: number }
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

      <MessageSendPreview />
      <MessageSendButtons emotion={variety} userId={userId} />
    </>
  )
}
