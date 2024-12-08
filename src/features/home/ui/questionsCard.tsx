'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface QuestionsCardProps {
  questionId: string
  userId: number
  createdAt: string
  description: React.ReactElement | string
  isHidden: boolean
  isHome: boolean
  title?: string
}

export const QuestionsCard = ({
  questionId,
  userId,
  createdAt,
  description,
  isHidden,
  isHome,
  title,
}: QuestionsCardProps) => {
  const router = useRouter()

  const onClickMoveDetail = (questionId: string) => {
    router.push(`/home/${userId}/question/${questionId}`)
    // TODO : 자유 질문이면 링크 이동처리
  }

  return (
    <div
      onClick={() => questionId && onClickMoveDetail(questionId)}
      className={`flex-col justify-start w-full bg-opacity-30 border border-[#D0E4FF] rounded-2xl overflow-hidden mt-[10px] relative ${isHome ? 'h-[106px] cursor-pointer' : 'h-fit'}`}
    >
      <div className='flex justify-center items-center w-full h-[44px] bg-gray-1'>
        <h3 className='text-gray-4 text-sm font-semibold'>{title}</h3>
        {isHome && isHidden && (
          <button className='absolute right-4'>
            <Image
              src='/icon_hide.svg'
              alt='hide icon'
              width={30}
              height={30}
            />
          </button>
        )}
      </div>
      <div
        className={`flex justify-center items-center w-full bg-white ${isHome ? 'h-[62px] p-[10px]' : 'h-full py-[10px] p-[12px]'}`}
      >
        {isHome ? (
          <p
            className={`whitespace-nowrap overflow-hidden  text-ellipsis font-normal text-[15px] text-center leading-[140%] tracking-[-1px] ${isHidden ? 'text-gray-2' : 'text-gray-4'}`}
          >
            {description}
          </p>
        ) : (
          <p
            className={`whitespace-pre-wrap font-normal text-[15px] text-center leading-[140%] tracking-[-1px] ${isHidden ? 'text-gray-2' : 'text-gray-4'}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
