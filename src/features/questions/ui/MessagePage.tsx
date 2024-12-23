'use client'

import MessageInput from '@/features/message/_send/_write/ui/messageInput'
import { useIsMobile } from '@/features/questions/hooks/useIsMobile'
import ReplyNextButton from '@/features/questions/ui/button/ReplyNextButton'
import QuestionBox from '@/shared/components/QuestionBox'
import { Spinner } from '@/shared/components/Spinner'
import Step from '@/shared/ui/Step'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

export default function MessagePage() {
  const queryClient = useQueryClient()
  const divRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile() // 모바일 여부를 확인하는 훅 사용
  const [keyboardHeight, setKeyboardHeight] = useState(0) // 키보드 높이 상태 추가

  const selectedQuestion = queryClient.getQueryData<{
    questionId: string
    content: string
    userId: string
  }>(['selectedQuestion'])

  useEffect(() => {
    if (isMobile) return

    const adjustButtonPosition = () => {
      if (divRef.current && window.visualViewport) {
        const viewportHeight = window.visualViewport.height || 0
        const keyboardHeight = window.innerHeight - viewportHeight
        setKeyboardHeight(keyboardHeight)
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', adjustButtonPosition)
    }

    adjustButtonPosition()

    return () => {
      window.visualViewport?.removeEventListener('resize', adjustButtonPosition)
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return

    const textarea = document.querySelector('textarea')

    const handleFocus = () => {
      setKeyboardHeight(300)
    }

    const handleBlur = () => {
      setKeyboardHeight(0)
    }

    textarea?.addEventListener('focus', handleFocus)
    textarea?.addEventListener('blur', handleBlur)

    return () => {
      textarea?.removeEventListener('focus', handleFocus)
      textarea?.removeEventListener('blur', handleBlur)
    }
  }, [isMobile])

  const steps = [1, 2]

  return selectedQuestion ? (
    <div className='flex-grow w-full h-screen pt-[30px] h-815:pb-[250px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
      <div className='grid flex items-center justify-center'>
        <div className='mb-5 ml-7'>
          <Step steps={steps} active={1} />
        </div>
        <p className='font-medium text-lg'>글을 입력해주세요!</p>
      </div>
      <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'>
        <QuestionBox
          key={selectedQuestion.questionId}
          questionId={selectedQuestion.questionId}
          content={selectedQuestion.content}
        />
      </div>
      <MessageInput />
      <div
        ref={divRef}
        className='fixed w-full max-w-[24rem] h-815:max-w-[22rem] px-4 sm:px-2 transition-all duration-300 flex justify-center'
        style={{
          bottom: isMobile ? keyboardHeight + 20 : 50,
          margin: '0 auto',
          left: 0,
          right: 0,
        }}
      >
        <ReplyNextButton />
      </div>
    </div>
  ) : (
    <Spinner />
  )
}
