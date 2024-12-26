import { FRONT_API_BASE_URL } from '@/shared/config/env'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'

interface QuestionListHeaderProps {
  className?: string
  userId: string
}

export const QuestionListHeader = React.forwardRef<
  HTMLDivElement,
  QuestionListHeaderProps
>(({ className, userId }, ref) => {
  const [clickCount, setClickCount] = React.useState(0) // 클릭 횟수 추적
  const [isDisabled, setIsDisabled] = React.useState(false)

  const addCount = () => {
    if (!isDisabled) {
      setClickCount((prev) => prev + 1)
    }
  }

  const shareOnUrl = () => {
    const contentToCopy = `${FRONT_API_BASE_URL}questions?userId=${userId}`

    const urlArea = document.createElement('textarea')
    document.body.appendChild(urlArea)
    urlArea.value = contentToCopy
    urlArea.select()
    document.execCommand('copy')
    document.body.removeChild(urlArea)

    toast(
      <div className='w-full flex items-center space-x-3 relative justify-center'>
        <Image
          src='/icon-check-fill.svg'
          alt='check icon fill'
          className='w-5 h-5'
          width={20}
          height={20}
        />
        <p>링크가 복사되었습니다.</p>
      </div>,

      {
        duration: 2000,
      }
    )
  }

  React.useEffect(() => {
    if (clickCount > 0) {
      // 버튼 비활성화
      setIsDisabled(true)

      // 토스트 표시
      shareOnUrl()

      // 3초 후 버튼 활성화
      const timer = setTimeout(() => {
        setIsDisabled(false)
      }, 3000)

      // 타이머 정리
      return () => clearTimeout(timer)
    }
  }, [clickCount])

  console.log('isDisabled', isDisabled)

  return (
    <div
      ref={ref}
      className={clsx(
        'w-full h-[60px] flex justify-between items-center px-[24px] bg-[#ffff]',
        className
      )}
    >
      <h3 className='font-semibold text-[18px] tracking-[-0.0625rem]'>
        내 질문 리스트
      </h3>
      <button
        disabled={isDisabled}
        onClick={addCount}
        className='flex justify-center items-center flex-shrink-0 border border-[#3490E6] py-[8px] px-[15px] w-[126px] bg-[#35B6FF] bg-opacity-30 rounded-3xl gap-[9px]'
      >
        <span className='text-[#0788D1] font-bold text-[12.98px] tracking-[-0.045rem] leading-[140%]'>
          전체 공유하기
        </span>

        <Image src='/icon_send.svg' alt='send icon' width={17} height={17} />
      </button>
    </div>
  )
})

QuestionListHeader.displayName = 'QuestionListHeader' // React DevTools에서 이름 표시
