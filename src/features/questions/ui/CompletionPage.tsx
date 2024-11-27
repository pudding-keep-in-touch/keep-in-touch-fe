// import Preview from '@/app/questions/reply/[questionId]/completion/Preview'
import Preview from '@/app/questions/messages/completion/Preview'
import ReplyButton from '@/features/questions/ui/button/ReplyButton'
import Step from '@/shared/ui/Step'

export default function CompletionPage() {
  const steps = [1, 2]

  //todo userNickname 받아야 함 지금은 테스트 용도
  const userNickname = 'luna'
  return (
    <>
      <div className='mt-[30px] mb-5'>
        <Step steps={steps} active={2} />
      </div>

      <p className='font-medium text-lg mb-10 text-center'>
        쪽지가 완성되었습니다.
        <br />
        미리보기로 내용을 확인하세요!
      </p>

      <Preview userNickname={userNickname} />

      <ReplyButton />
    </>
  )
}
