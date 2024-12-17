'use client'
import React from 'react'

interface TooltipProps {
  children: React.ReactNode
}

export default function Tooltip({ children }: TooltipProps) {
  return (
    <div className='group relative flex items-center justify-center mt-[46px] w-full h-fit flex-col gap-2'>
      <div className='absolute top-[-60px] hidden group-hover:flex flex-col items-center gap-4  max-w-[300px] '>
        <div className='bg-black rounded-full py-3 px-[20px] h-[46px] relative flex items-center '>
          <p className='line-height: 1.5rem text-[12px] text-white leading-none'>
            👍 친구에게 감정 이모지를 보낼 수 있어요!
          </p>
          <div className='absolute w-3 h-3 bg-black transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5'></div>
        </div>
      </div>
      {children}
    </div>
  )
}
