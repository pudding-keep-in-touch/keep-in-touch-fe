'use client'

import { BackHeader } from '@/shared/ui/BackHeader'
import LinkShareButton from '@/features/home/ui/linkShareButton'
import MessageFormProvider from '@/features/message/_send/context/FormProvider'
import WriteInput from '@/features/home/ui/writeInput'
import React from 'react'

interface WriteQuestionProps {
  userId: number
}

export const WriteQuestion = ({ userId }: WriteQuestionProps) => {
  const [toggle, setToggle] = React.useState(false)

  const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      // 키보드가 활성화된 상태인지 확인
      const isKeyboard = window.visualViewport?.height
        ? window.innerHeight > window.visualViewport.height
        : false

      setIsKeyboardVisible(isKeyboard)
    }

    // 이벤트 리스너 등록
    window.visualViewport?.addEventListener('resize', handleResize)
    window.addEventListener('resize', handleResize)

    // 초기 상태 확인
    handleResize()

    return () => {
      // 이벤트 리스너 해제
      window.visualViewport?.removeEventListener('resize', handleResize)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onClickToggle = () => {
    setToggle((prev) => !prev)
  }

  return (
    <div className='w-full h-screen flex flex-col relative'>
      <BackHeader title='질문 만들기' />
      <div className='w-full h-screen flex flex-col relative'>
        <div className='flex-grow w-full h-screen pt-[82px] h-815:pb-[200px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
          <div className='w-full px-[24px]'>
            <p className='font-semibold text-base mb-4 text-gray-4'>
              질문 작성하기
            </p>
            <MessageFormProvider>
              <WriteInput isColor type='question' maxLength={140} />
            </MessageFormProvider>
          </div>
          <div className='w-full h-2 bg-gray-1' />

          <div className='w-full px-[24px]'>
            <div className='flex flex-col mt-5 mb-4 gap-2'>
              <h3 className='font-semibold text-[16px] tracking-[-0.75px]'>
                숨기기 설정
              </h3>
              <p className='font-medium text-[12px] leading-[130%] tracking-[-0.75px] text-[#6B7684]'>
                질문 숨기기를 설정하면 전체 리스트 공유 시 해당 질문이 노출되지
                않습니다.
              </p>
            </div>
            {!toggle ? (
              <button
                onClick={onClickToggle}
                className='flex w-[159px] py-2 w-380:w-full h-[47px] justify-center items-center px-4 bg-gray-1 rounded-2xl gap-[13px]'
              >
                <img src='/icon_show.svg' alt='show icon' />
                <span className='font-medium text-[14px] leading-[22px] tracking-[-0.43px] text-gray-3'>
                  이 질문 숨기기
                </span>
              </button>
            ) : (
              <button
                onClick={onClickToggle}
                className='flex w-[198px] py-2 w-380:w-full h-[47px] justify-center items-center px-4 bg-[#C5C5C5] rounded-2xl gap-[13px]'
              >
                <img src='/icon_hide.svg' alt='hide icon' />
                <span className='font-medium text-[14px] leading-[22px] tracking-[-0.43px] text-gray-3'>
                  숨김 처리된 질문입니다
                </span>
              </button>
            )}
          </div>

          <div
            className={`w-full flex justify-between items-center px-[24px] absolute z-10 transition-all duration-300 ${
              isKeyboardVisible ? 'bottom-[300px]' : 'bottom-[20px]'
            }`}
          >
            <LinkShareButton userId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
}
