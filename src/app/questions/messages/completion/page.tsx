// import Preview from '@/app/questions/reply/[questionId]/completion/Preview'
import ReplyButton from '@/app/questions/messages/completion/buttons/ReplyButton'
import Step from '@/app/questions/shared/Step'

export default function Completion() {
  const steps = [1, 2]
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

      {/* <Preview /> */}
      {/* todo preview 이미지 */}

      <ReplyButton />
    </>
  )
}
