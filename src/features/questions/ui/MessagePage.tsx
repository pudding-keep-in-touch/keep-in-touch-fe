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
  const isMobile = useIsMobile() // 모바일 여부를 확인하는 훅 사용
  const [keyboardHeight, setKeyboardHeight] = useState(0) // 키보드 높이 상태 추가

  // const selectedQuestion = queryClient.getQueryData<{
  //   questionId: string
  //   content: string
  //   userId: string
  // }>(['selectedQuestion'])

  const selectedQuestion = JSON.parse(
    localStorage.getItem('selectedQuestion') || '{}'
  )

  // selectedQuestion 데이터가 유효한 경우에만 QueryClient에 데이터 설정
  // useEffect(() => {
  //   if (Object.keys(selectedQuestion).length > 0) {
  //     queryClient.setQueryData(['selectedQuestion'], selectedQuestion)
  //     localStorage.removeItem('selectedQuestion') // 복원 후 삭제
  //   }
  // }, [selectedQuestion, queryClient])
  // useEffect(() => {
  //   const storedSelectedQuestion = localStorage.getItem('selectedQuestion');
  //   if (storedSelectedQuestion) {
  //     const parsedData = JSON.parse(storedSelectedQuestion);
  //     if (Object.keys(parsedData).length > 0) {
  //       queryClient.setQueryData(['selectedQuestion'], parsedData);
  //       localStorage.removeItem('selectedQuestion'); // 복원 후 삭제
  //     }
  //   }
  // }, [queryClient]);

  useEffect(() => {
    if (Object.keys(selectedQuestion).length > 0) {
      queryClient.setQueryData(['selectedQuestion'], selectedQuestion)
      localStorage.removeItem('selectedQuestion') // 복원 후 삭제
    }
  }, [selectedQuestion, queryClient])

  console.log('setQueryData', selectedQuestion)

  // // 화면에 렌더링된 후에도 `selectedQuestion` 데이터를 확인하여 UI 업데이트
  // const questionData = queryClient.getQueryData<{
  //   questionId: string
  //   content: string
  //   userId: string
  // }>(['selectedQuestion'])

  // console.log('Selected Question:', questionData)

  // if (!questionData) {
  //   return <p>선택된 질문이 없습니다.</p>
  // }

  useEffect(() => {
    if (isMobile) return // 모바일에서만 동작하도록 설정

    const adjustButtonPosition = () => {
      if (divRef.current && window.visualViewport) {
        const viewportHeight = window.visualViewport.height || 0
        const keyboardHeight = window.innerHeight - viewportHeight // 키보드 높이 계산

        // 버튼 위치를 키보드 바로 위로 설정
        setKeyboardHeight(keyboardHeight)
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
  }, [isMobile]) // 모바일 여부가 변경될 때마다 실행

  useEffect(() => {
    if (isMobile) return // 모바일에서만 동작하도록 설정

    const textarea = document.querySelector('textarea')

    const handleFocus = () => {
      setKeyboardHeight(300) // 예상 키보드 높이
    }

    const handleBlur = () => {
      setKeyboardHeight(0) // 키보드가 닫힐 때 높이 0으로 설정
    }

    textarea?.addEventListener('focus', handleFocus)
    textarea?.addEventListener('blur', handleBlur)

    return () => {
      textarea?.removeEventListener('focus', handleFocus)
      textarea?.removeEventListener('blur', handleBlur)
    }
  }, [isMobile]) // 모바일 여부가 변경될 때마다 실행

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

      <div
        ref={divRef}
        className='fixed w-full max-w-[24rem] px-4 transition-all duration-300'
        style={{
          bottom: isMobile ? keyboardHeight + 60 : 12, // 모바일에서만 위치 조정
          // transition: 'bottom 0.2s ease-out', // smooth transition
        }}
      >
        <ReplyNextButton />
      </div>
    </>
  )
}
