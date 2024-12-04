'use client'

import { BackHeader } from '@/shared/ui/BackHeader'
import WriteInput from '@/features/home/ui/writeInput'
import React from 'react'
import CompleteButton from './ui/completeButton'
import Image from 'next/image'
import { debounce } from 'lodash'
import { usePostQuestionList } from './api/api'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { QuestionFormValues } from './model/formSchema'
import QuestionFormProvider from './context/FormProvider'
interface WriteQuestionProps {
  userId: number
}

export const WriteQuestion = ({ userId }: WriteQuestionProps) => {
  const router = useRouter()
  const [currentDescription, setCurrentDescription] = React.useState('')
  const [toggle, setToggle] = React.useState(false)
  const [isError, setIsError] = React.useState(true)

  const [isFocus, setIsFocus] = React.useState(false)
  const [keyboardHeight, setKeyboardHeight] = React.useState(0)
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const scrollableRef = React.useRef<HTMLDivElement | null>(null)
  const { formState, handleSubmit } = useFormContext<QuestionFormValues>()

  const { mutateAsync, isPending } = usePostQuestionList()
  const { isValid } = formState

  // 키보드 높이 계산 및 상태 업데이트
  React.useEffect(() => {
    const handleResize = debounce(() => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight
      const heightDiff = window.innerHeight - viewportHeight
      const isKeyboardVisible = heightDiff > 0

      console.log('Viewport Height:', viewportHeight)
      console.log('Inner Height:', window.innerHeight)
      console.log('Height Difference:', heightDiff)
      console.log('isKeyboardVisible', isKeyboardVisible)

      // 키보드 높이 정규화
      const normalizedHeight = isKeyboardVisible
        ? heightDiff > 250
          ? 300
          : 270
        : 0

      setKeyboardHeight((prev) =>
        Math.abs(prev - normalizedHeight) > 20 ? normalizedHeight : prev
      )
    }, 50) // 디바운스 50ms

    window.visualViewport?.addEventListener('resize', handleResize)

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  // 포커스 처리
  const onFocus = () => {
    setIsFocus(true)
    if (scrollableRef.current && contentRef.current) {
      scrollableRef.current.style.height = `calc(100% + 1px)`
      contentRef.current.style.overflow = 'hidden'
    }
  }

  const onFocusOut = () => {
    setIsFocus(false)
    if (scrollableRef.current && contentRef.current) {
      scrollableRef.current.style.height = `0`
      contentRef.current.style.overflow = ''
    }
  }

  // 활성화된 요소로 스크롤
  const scrollToActiveElement = () => {
    if (contentRef.current && window.visualViewport) {
      const viewScrollHeight = contentRef.current.scrollHeight
      const offset = viewScrollHeight - window.visualViewport.height
      contentRef.current.scrollTo(0, offset)
    }
  }

  const onSubmit = handleSubmit(async (formValues) => {
    console.log('formValues', formValues)
    try {
      const response = await mutateAsync({
        content: formValues.question,
        isHidden: toggle,
      })

      if (response) {
        router.push(`/home/${userId}`)
      } else {
        console.error('respons가 응답에 없습니다:', response)
      }
    } catch (error) {
      console.log('질문 작성에 실패했습니다.')
    }
  })

  React.useEffect(() => {
    if (isFocus) {
      onFocus()
      scrollToActiveElement()
    } else {
      onFocusOut()
    }
  }, [isFocus])

  const onClickToggle = () => {
    setToggle((prev) => !prev)
  }

  React.useEffect(() => {
    const desc =
      typeof window !== 'undefined' ? localStorage.getItem('description') : null

    if (desc) {
      setCurrentDescription(desc)
    }
  }, [])

  return (
    <div id='wrapper' className='w-full h-screen flex flex-col relative'>
      <BackHeader title='질문 만들기' />
      <div id='content' className='w-full h-screen flex flex-col relative'>
        <div className='flex-grow w-full h-screen pt-[82px] h-815:pb-[200px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
          <div className='w-full px-[24px]'>
            <p className='font-semibold text-base mb-4 text-gray-4'>
              질문 작성하기
            </p>

            <WriteInput
              isColor
              type='question'
              maxLength={140}
              setIsError={setIsError}
              desc={currentDescription}
              onFocus={() => setIsFocus(true)} // 포커스 시 상태 업데이트
              onBlur={() => setIsFocus(false)} // 포커스 해제 시 상태 초기화
            />
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
                className='flex w-[159px] py-2 w-380:w-full h-[47px] justify-between items-center px-4 bg-gray-1 rounded-2xl'
              >
                <Image
                  src='/icon_show.svg'
                  alt='show icon'
                  width={30}
                  height={30}
                />
                <span className='font-medium text-[14px] leading-[22px] tracking-[-0.43px] text-gray-3'>
                  이 질문 숨기기
                </span>
              </button>
            ) : (
              <button
                onClick={onClickToggle}
                className='flex w-[198px] py-2 w-380:w-full h-[47px] justify-between items-center px-4 bg-[#C5C5C5] rounded-2xl'
              >
                <Image
                  src='/icon_hide.svg'
                  alt='hide icon'
                  width={30}
                  height={30}
                />
                <span className='font-medium text-[14px] leading-[22px] tracking-[-0.43px] text-gray-3'>
                  숨김 처리된 질문입니다
                </span>
              </button>
            )}
          </div>
        </div>

        <div
          className={`sticky w-full flex justify-between items-center px-[24px] z-10`}
          style={{
            bottom: keyboardHeight > 0 ? `${keyboardHeight + 60}px` : '100px',
            transition: 'bottom 0.2s ease-out',
            position: 'absolute',
            width: '100%',
          }}
        >
          <CompleteButton
            userId={userId}
            isDisabled={isError && isValid}
            keyboardHeight={keyboardHeight}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      {/* <div id='make-scrollable' /> */}
    </div>
  )
}
