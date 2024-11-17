'use client'

import MessageInput from '@/app/message/send/[userId]/[variety]/write/_components/messageInput'
import Step from '@/app/questions/shared/Step'
import ReplyNextButton from '@/app/questions/reply/[questionId]/ReplyNextButton'

// const QuestionsPage = () => {
//   const searchParams = useSearchParams()
//   const questionId = searchParams.get('questionId')

export default function QuestionsPage({
  params: { questionId },
}: {
  params: { questionId: number }
}) {
  // useForm 훅 초기화
  // const methods = useForm();

  const steps = [1, 2]

  return (
    <>
      <h1>Reply page</h1>
      {questionId ? (
        <p>현재 선택된 질문 ID: {questionId}</p>
      ) : (
        <p>질문 ID가 제공되지 않았습니다.</p>
      )}

      <div className='mt-[30px] mb-5'>
        <Step steps={steps} active={1} />
      </div>

      <p className='font-medium text-lg mb-10'>글을 입력해주세요!</p>

      <MessageInput />

      <ReplyNextButton questionId={questionId} />
    </>
  )
}
