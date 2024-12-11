'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'
import QuestionBox from '@/shared/components/QuestionBox'
import { isUserLoggedIn } from '@/shared/hooks/useAuth'
import { useGetQuestionList } from '@/features/questions/hooks/query/useQuestionQuery'

export default function QuestionListPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const searchParams = useSearchParams()

  const userId = searchParams.get('userId') || ''

  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useGetQuestionList(userId)
  //todo 데이터가 없을 떄

  //todo 로그인 state추가F=${
  // const redirectToLoginIfNeeded = (callback: () => void) => {
  //   if (!isUserLoggedIn()) {
  //     // 로그인 페이지로 이동, 원래 페이지인 /questions/messages 경로를 redirectUrl로 전달
  //     const redirectUrl = encodeURIComponent('/questions/messages')
  //     router.push(`/login?redirectUrl=${redirectUrl}`)
  //   } else {
  //     // 로그인 상태라면 콜백 실행
  //     callback()
  //   }
  // }

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

  console.log(
    'Selected Question:',
    queryClient.getQueryData(['selectedQuestion'])
  )

  //todo 리다이렉션 테스트 필요
  const handleTypeMessageClick = () => {
    redirectToLoginIfNeeded(() => {
      router.push(`/message/send/${userId}/select`)
    })
  }

  // 에러 상태 처리
  // todo 디자인 페이지로 변경 예정
  if (isError || !userId) {
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
            원하는 질문을 클릭해 답장해보세요!
          </h2>
        </div>

        <div className='flex-grow w-full h-screen pt-[30px] h-815:pb-[250px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
          <div className='w-full px-[24px] grid grid-cols-1 gap-6'>
            {/* <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'> */}
            {/* 자유질문 */}
            <QuestionBox
              key={99}
              // questionId={'99'}
              variant='custom'
              onTypeClick={handleTypeMessageClick}
              userId={userId}
            />

            {questions?.map((question) => (
              <QuestionBox
                key={question?.questionId}
                questionId={question.questionId}
                userId={question.userId}
                content={question.content}
                onQuestionClick={handleQuestionClick}
              />
            ))}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
