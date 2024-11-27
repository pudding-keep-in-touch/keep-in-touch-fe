'use client'

import MessageInput from '@/features/message/_send/_write/ui/messageInput'
import ReplyNextButton from '@/features/questions/ui/button/ReplyNextButton'
import QuestionBox from '@/shared/components/QuestionBox'
import Step from '@/shared/ui/Step'
import { useQueryClient } from '@tanstack/react-query'

export default function MessagePage() {
  const queryClient = useQueryClient()

  const selectedQuestion = queryClient.getQueryData<{
    questionId: string
    content: string
  }>(['selectedQuestion'])

  const steps = [1, 2]

  if (!selectedQuestion) {
    return <p>선택된 질문이 없습니다.</p>
  }

  return (
    <>
      <div className='mt-[30px] mb-5'>
        <Step steps={steps} active={1} />
      </div>
      <p className='font-medium text-lg mb-2'>글을 입력해주세요!</p>

      <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'>
        <QuestionBox
          key={selectedQuestion.questionId}
          questionId={selectedQuestion.questionId}
          content={selectedQuestion.content}
        />
      </div>

      <MessageInput />

      {/* <ReplyNextButton content={selectedQuestion.content}/> */}
      <ReplyNextButton />
    </>
  )
}
