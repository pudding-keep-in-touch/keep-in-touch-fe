'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/shared/components/Button'
// import { question, questions } from '@/entities/questions/questionData'
import QuestionBox from '@/shared/components/QuestionBox'
import { useQueryClient } from '@tanstack/react-query'
import { useGetQuestion } from '@/features/questions/hooks/query/useQuestionQuery'

export default function QuestionPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  // URL에서 questionId를 가져옵니다.
  const { questionId } = useParams<{ questionId: string }>()

  const { data: question } = useGetQuestion(questionId)

  console.log(question)

  const handleQuestionClick = (
    questionId: string,
    content: string,
    userId: string
  ) => {
    console.log('click')
    // 선택된 질문 데이터를 캐싱
    queryClient.setQueryData(['selectedQuestion'], {
      questionId,
      content,
      userId,
    })
    // ReplyPage로 이동
    router.push('/questions/messages')
  }

  return (
    <>
      <div className='flex flex-col min-h-screen items-center'>
        <div className='mt-[40px] flex flex-col w-[100%] items-center text-center'>
          <Image
            src='/questionsKeepInTouchLogo.svg'
            alt='questionsKeepInTouchLogo'
            width={160}
            height={160}
          />
          <h2 className='text-[#333D4B] text-xl font-semibold leading-[150%] mt-6'>
            쪽지를 익명으로 보낼 수 있어요!
          </h2>
        </div>

        <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'>
          <QuestionBox
            key={question?.questionId}
            questionId={question?.questionId}
            content={question?.content}
            userId={question?.userId}
            onQuestionClick={handleQuestionClick}
          />

          <Button
            type='button'
            onClick={() =>
              handleQuestionClick(
                question?.questionId || '',
                question?.content || '',
                question?.userId || ''
              )
            } // 함수 호출
            className='h-fit p-4 bg-[#35B6FF] text-white rounded-2xl font-bold mt-60 w-full'
          >
            {' '}
            마음 전하러 가기
          </Button>
        </div>
      </div>
    </>
  )
}
