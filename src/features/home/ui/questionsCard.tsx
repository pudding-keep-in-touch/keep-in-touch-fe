'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

interface QuestionsCardProps {
  questionId?: number
  userId: number
  title: string
  description: React.ReactElement | string
  isFreeQuestion: boolean
  isHome: boolean
}

export const QuestionsCard = ({
  questionId,
  userId,
  title,
  description,
  isFreeQuestion,
  isHome,
}: QuestionsCardProps) => {
  const router = useRouter()

  const onClick = (questionId: number) => {
    if (!isFreeQuestion) {
      router.push(`/home/${userId}/question/${questionId}`)
    }
    // TODO : 자유 질문이면 링크 이동처리
  }
  return (
    <div
      onClick={() => questionId && onClick(questionId)}
      className={`flex-col justify-start w-full bg-opacity-30 border border-[#D0E4FF] rounded-2xl overflow-hidden mt-[10px] relative ${isHome ? 'h-[106px] cursor-pointer' : 'h-fit'}`}
    >
      <div className='flex justify-center items-center w-full h-[44px] bg-gray-1'>
        <h3 className='text-gray-4 text-sm font-semibold'>{title}</h3>
        {isHome && !isFreeQuestion && (
          <button className='absolute right-4'>
            <img src='/icon_hide.svg' />
          </button>
        )}
      </div>
      <div
        className={`flex justify-center items-center w-full bg-white ${isHome ? 'h-[62px] p-[10px]' : 'h-full py-[10px] p-[12px]'}`}
      >
        <p
          className={`whitespace-pre-wrap font-normal text-[15px] text-center leading-[140%] tracking-[-1px] ${isHome ? 'text-gray-2' : 'text-gray-4'}`}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
