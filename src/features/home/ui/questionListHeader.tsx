import clsx from 'clsx'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface QuestionListHeaderProps {
  className?: string
  userId: number
}

export const QuestionListHeader = React.forwardRef<
  HTMLDivElement,
  QuestionListHeaderProps
>(({ className, userId }, ref) => {
  const pathname = usePathname()

  function shareOnUrl() {
    const contentToCopy = `https://dev-fe.keep-in-touch.me${pathname}`

    const urlArea = document.createElement('textarea')
    document.body.appendChild(urlArea)
    urlArea.value = contentToCopy
    urlArea.select()
    document.execCommand('copy')
    document.body.removeChild(urlArea)

    toast(
      <div className='w-full flex items-center space-x-3 relative justify-center'>
        <img
          src='/icon-check-fill.svg'
          alt='check icon fill'
          className='w-5 h-5'
        />
        <p>링크가 복사되었습니다.</p>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={clsx(
        'w-full h-[50px] flex justify-between items-center px-[24px] bg-[#F6F7FC]',
        className
      )}
    >
      <h3 className='font-semibold text-[18px] tracking-[-0.0625rem]'>
        내 질문 리스트
      </h3>
      <button
        onClick={shareOnUrl}
        className='flex justify-center items-center flex-shrink-0  py-[3px] px-[9px] w-[110px] bg-[#35B6FF] bg-opacity-30 rounded-3xl gap-[9px]'
      >
        <div>
          <span className='text-[#0788D1] font-bold text-[12.98px] tracking-[-0.045rem] leading-[140%]'>
            전체 공유하기
          </span>
        </div>
        <Image src='/icon_send.svg' alt='send icon' width={17} height={17} />
      </button>
    </div>
  )
})

QuestionListHeader.displayName = 'QuestionListHeader' // React DevTools에서 이름 표시
