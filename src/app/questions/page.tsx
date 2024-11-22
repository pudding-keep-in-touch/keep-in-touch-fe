'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'
import { questions } from '@/entities/questions/questionData'
import QuestionBox from '@/shared/components/QuestionBox'
import { useRandomDescriptionQuery } from '@/features/questions/hooks/query/useRandomDescriptionQuery'
import { Spinner } from '@/shared/components/Sppiner'

export default function QuestionListPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isLoading: isRandomDescriptionLoading } = useRandomDescriptionQuery()

  //todo 로그인 state추가

  // const handleQuestionClick = (questionId: number) => {
  //   //todo 온보딩 페이지로 이동
  //   // router.push(`/onboarding?questionId=${questionId}`);
  //   router.push(`/questions/messages`)
  // }

  const handleQuestionClick = (questionId: number, content: string) => {
    // 선택된 질문 데이터를 캐싱
    queryClient.setQueryData(['selectedQuestion'], { questionId, content })
    // ReplyPage로 이동
    router.push('/questions/messages')
  }

  return (
    <>
      <div className='flex flex-col min-h-screen items-center'>
        <div className='mt-[80px] flex flex-col w-[100%] items-center text-center'>
          {/* todo 아이콘으로 수정 */}
          <Image
            src='/questionsKeepInTouchLogo.svg'
            alt='questionsKeepInTouchLogo'
            width={160}
            height={160}
          />
          <h2 className='text-[#333D4B] text-xl font-semibold leading-[150%] mt-6'>
            쪽지를 보내고 싶은 질문을 선택하세요!
          </h2>
        </div>

        <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'>
          {/* 자유질문 */}
          {isRandomDescriptionLoading ? (
            <div className='w-full h-[200px] flex justify-center items-center'>
              <Spinner />
            </div>
          ) : (
            <>
              <QuestionBox
                questionId={99}
                variant='custom'
                onClick={handleQuestionClick}
              />

              {questions.map((question) => (
                <QuestionBox
                  key={question.questionId}
                  questionId={question.questionId}
                  content={question.content}
                  onClick={handleQuestionClick}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}
