'use client'

import MessageInput from '@/features/message/_send/_write/ui/messageInput'
import { useIsMobile } from '@/features/questions/hooks/useIsMobile'
import ReplyNextButton from '@/features/questions/ui/button/ReplyNextButton'
import QuestionBox from '@/shared/components/QuestionBox'
import Step from '@/shared/ui/Step'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

export default function MessagePage() {
  const queryClient = useQueryClient()
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const adjustButtonPosition = () => {
      if (divRef.current && window.visualViewport) {
        const viewportHeight = window.visualViewport.height || 0
        const scrollY = window.scrollY || 0

        // 버튼 위치를 키보드 위로 이동 (스크롤 + 뷰포트 높이 계산)
        divRef.current.style.bottom = `${scrollY + window.innerHeight - viewportHeight}px`
      }
    }

    // visualViewport 크기 변경 감지
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', adjustButtonPosition)
    }

    // 초기 위치 설정
    adjustButtonPosition()

    // 이벤트 제거
    return () => {
      window.visualViewport?.removeEventListener('resize', adjustButtonPosition)
    }
  }, [])

  useEffect(() => {
    const textarea = document.querySelector('textarea')

    const handleFocus = () => {
      divRef.current!.style.bottom = '300px' // 예상 키보드 높이
    }

    const handleBlur = () => {
      divRef.current!.style.bottom = '0px'
    }

    textarea?.addEventListener('focus', handleFocus)
    textarea?.addEventListener('blur', handleBlur)

    return () => {
      textarea?.removeEventListener('focus', handleFocus)
      textarea?.removeEventListener('blur', handleBlur)
    }
  }, [])

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
      <p className='font-medium text-lg '>글을 입력해주세요!</p>

      <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'>
        <QuestionBox
          key={selectedQuestion.questionId}
          questionId={selectedQuestion.questionId}
          content={selectedQuestion.content}
        />
      </div>

      <MessageInput />

      {/* <ReplyNextButton content={selectedQuestion.content}/> */}
      <div
        ref={divRef}
        className='fixed left-0 w-full px-4 transition-all duration-300'
        style={{ bottom: '0px' }} // 기본 위치는 화면 하단
      >
        <ReplyNextButton />
      </div>

      {/* <ReplyNextButton /> */}
    </>
  )
}
