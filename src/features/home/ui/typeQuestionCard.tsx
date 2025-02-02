import Image from 'next/image'
import React from 'react'

interface QuestionsCardProps {
  isHome: boolean
}

export const TypeQuestionCard = ({ isHome }: QuestionsCardProps) => {
  return (
    <div
      className={`flex-col justify-start w-full bg-opacity-30 border border-[#D0E4FF] rounded-2xl overflow-hidden mt-[10px] relative  ${isHome ? 'h-[186px] cursor-pointer' : 'h-fit'}`}
    >
      <div className='flex justify-center items-center w-full h-[44px] bg-white'>
        <h3 className='text-gray-4 text-[14px] font-semibold'>
          질문 없이도 퐁을 받을 수 있어요
        </h3>
      </div>
      <div className='flex justify-center items-center w-full bg-white overflow-hidden'>
        {/* 이미지 */}
        <Image
          className='object-cover min-w-[342px] min-h-[142px] w-full'
          src='/free_question.svg'
          alt='자유 질문 이미지'
          width={342}
          height={142}
        />
      </div>
    </div>
  )
}
