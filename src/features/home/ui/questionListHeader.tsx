import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface QuestionListHeaderProps {
  className?: string
}

export const QuestionListHeader = React.forwardRef<
  HTMLDivElement,
  QuestionListHeaderProps
>(({ className }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'w-full h-[50px] flex justify-between items-center px-[24px] bg-[#F6F7FC] z-10',

        className
      )}
    >
      <h3 className='font-semibold text-[18px] tracking-[-0.0625rem]'>
        내 질문 리스트
      </h3>
      <button className='flex justify-center items-center flex-shrink-0  py-[3px] px-[9px] w-[110px] bg-[#35B6FF] bg-opacity-30 rounded-3xl gap-[9px]'>
        <div>
          <span className='text-[#0788D1] font-bold text-[12.98px] tracking-[-0.045rem] leading-[140%]'>
            전체 공유하기
          </span>
        </div>
        {/* <div className='flex justify-center items-center w-full h-fit'> */}
        <Image src='/icon_send.svg' alt='send icon' width={17} height={17} />
        {/* </div> */}
      </button>
    </div>
  )
})

QuestionListHeader.displayName = 'QuestionListHeader' // React DevTools에서 이름 표시
