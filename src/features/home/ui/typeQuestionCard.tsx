import { useRouter } from 'next/navigation'
import React from 'react'

interface QuestionsCardProps {
  questionId?: number
  userId: number
  isHome: boolean
}

export const TypeQuestionCard = ({
  questionId,
  userId,
  isHome,
}: QuestionsCardProps) => {
  const router = useRouter()

  const onClickMoveHome = () => {
    // TODO : 자유 질문이면 링크 이동처리
    router.push(`/home/${userId}/question/free`)
  }

  return (
    <div
      onClick={onClickMoveHome}
      className={`flex-col justify-start w-full bg-opacity-30 border border-[#D0E4FF] rounded-2xl overflow-hidden mt-[10px] relative  ${isHome ? 'h-[186px] cursor-pointer' : 'h-fit'}`}
    >
      <div className='flex justify-center items-center w-full h-[44px] bg-gray-1'>
        <h3 className='text-gray-4 text-sm font-semibold'>타입별 마음 받기</h3>
      </div>
      <div className='flex justify-center items-center w-full bg-white overflow-hidden'>
        {/* 이미지 */}
        <img
          className='object-cover w-full h-full'
          src='/free_question.svg'
          alt='자유 질문 이미지'
        />
      </div>
    </div>
  )
}
