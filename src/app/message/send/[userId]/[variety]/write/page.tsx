'use client'

import MessageInput from '@/features/message/_send/_write/ui/messageInput'
import MessageWriteNextButton from '@/features/message/_send/_write/ui/nextButton'
import MessageSendStep from '@/features/message/_send/ui/step'
import { useIsMobile } from '@/features/questions/hooks/useIsMobile'
import { useEffect, useRef, useState } from 'react'

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile() // 모바일 여부를 확인하는 훅 사용
  const [keyboardHeight, setKeyboardHeight] = useState(0) // 키보드 높이 상태 추가

  useEffect(() => {
    if (!isMobile) return

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

  return (
    <div className='flex-grow w-full h-screen pt-[30px] h-815:pb-[250px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
      <div className='grid flex items-center justify-center'>
        <div className='mb-5 ml-3'>
          <MessageSendStep active={2} />
        </div>
        <p className='font-medium text-lg mb-10'>내용을 작성하세요.</p>
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
        <MessageWriteNextButton userId={userId} />
      </div>
    </div>
  )
}
