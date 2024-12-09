'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/shared/components/Button'
import QuestionBox from '@/shared/components/QuestionBox'
import { useGetQuestion } from '@/features/questions/hooks/query/useQuestionQuery'
import { isUserLoggedIn } from '@/shared/hooks/useAuth'

export default function QuestionPage() {
  const router = useRouter()

  // URL에서 questionId를 가져옵니다.
  const { questionId } = useParams<{ questionId: string }>()

  const {
    data: question,
    isError,
    isLoading,
    error,
  } = useGetQuestion(questionId)

  console.log(question)

  const redirectToLoginIfNeeded = (callback: () => void) => {
    if (!isUserLoggedIn()) {
      // /questions/messages로 리다이렉트하도록 설정
      const redirectUrl = '/questions/messages'
      localStorage.setItem('redirect_before_login', redirectUrl) // 이전 경로 저장
      router.push(`/login?redirectUrl=${encodeURIComponent(redirectUrl)}`)
    } else {
      callback() // 로그인 상태라면 콜백 실행
    }
  }

  const handleQuestionClick = (
    questionId: string,
    content: string,
    userId: string
  ) => {
    const selectedQuestion = {
      questionId,
      content,
      userId,
    }

    // 데이터를 즉시 localStorage에 저장
    localStorage.setItem('selectedQuestion', JSON.stringify(selectedQuestion))

    // 로그인 상태에 따라 리다이렉트
    redirectToLoginIfNeeded(() => {
      router.push('/questions/messages')
    })
  }

  // 에러 상태 처리
  // todo 디자인 페이지로 변경 예정
  if (isError) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-xl font-semibold text-red-600'>
          {error?.message || 'page not found'}
        </h1>
      </div>
    )
  }

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-xl font-semibold text-gray-600'>로딩 중...</h1>
      </div>
    )
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
