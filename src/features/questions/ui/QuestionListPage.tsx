'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'
import QuestionBox from '@/shared/components/QuestionBox'
import { questions } from '@/entities/questions/questionData'
import { useState } from 'react'
import { isUserLoggedIn } from '@/shared/hooks/useAuth'

export default function QuestionListPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const userId = questions.map((question) => question.userId)

  //todo nickname 가져오기
  console.log('questions', questions)
  const nickname = 'luna'

  //todo 로그인 state추가
  const redirectToLoginIfNeeded = (callback: () => void) => {
    if (!isUserLoggedIn()) {
      // 로그인 페이지로 이동 (현재 경로 포함)
      const currentPath = window.location.pathname
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
    } else {
      // 로그인 상태면 콜백 실행
      callback()
    }
  }

  const handleQuestionClick = (questionId: string, content: string) => {
    // redirectToLoginIfNeeded(() => {
    // 선택된 질문 데이터를 캐싱
    queryClient.setQueryData(['selectedQuestion'], { questionId, content })
    // ReplyPage로 이동
    router.push('/questions/messages')
    // })
  }

  const handleTypeMessageClick = () => {
    router.push(`/message/send/${userId}/select`)
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
              questionId={'99'}
              variant='custom'
              onTypeClick={handleTypeMessageClick}
            />

            {questions.map((question) => (
              <QuestionBox
                key={question.questionId}
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
