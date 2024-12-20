'use client'

import React from 'react'

interface TooltipProps {
  children: React.ReactNode
}

export default function Tooltip({ children }: TooltipProps) {
  return (
    <div className='group relative flex items-center justify-center mt-[46px] w-full h-fit flex-col gap-4'>
      <div className='absolute top-[-60px] hidden group-hover:flex flex-col items-center gap-4'>
        <div className='bg-black rounded-full py-3 px-[41px] h-[46px] relative'>
          <p className='line-clamp-1 text-base text-[13px] text-white'>
            🔗 이 질문 하나만 공유할 수 있어요!
          </p>
          <div className='absolute w-3 h-3 bg-black transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5'></div>
        </div>
      </div>
      {children}
    </div>
  )
}
