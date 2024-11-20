import React from 'react'

interface QuestionsCardProps {
  title: string
  description: React.ReactElement | string
  isFreeQuestion: boolean
}

export const QuestionsCard = ({
  title,
  description,
  isFreeQuestion,
}: QuestionsCardProps) => {
  return (
    <div className='flex-col justify-start w-full h-[106px] bg-opacity-30 border border-[#D0E4FF] rounded-2xl overflow-hidden mt-[10px] relative'>
      <div className='flex justify-center items-center w-full h-[44px] bg-gray-1'>
        <h3 className='text-gray-4 text-sm font-semibold'>{title}</h3>
        {!isFreeQuestion && (
          <button className='absolute right-4'>
            <img src='/icon_hide.svg' />
          </button>
        )}
      </div>
      <div className='flex h-[62px] justify-center items-center w-full bg-white p-[10px]'>
        <p className='text-gray-2 font-normal text-[15px] leading-[1.4] tracking-tightest'>
          {description}
        </p>
      </div>
    </div>
  )
}
