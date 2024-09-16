'use client'

import React from 'react'

interface TooltipProps {
  children: React.ReactNode
}

export default function Tooltip({ children }: TooltipProps) {
  return (
    <div className='flex items-center justify-center mt-[46px] w-full h-fit flex-col gap-4'>
      <div className='relative inline-block'>
        <div className='bg-black text-white text-sm rounded-full py-3 px-4 max-w-xs h-[46px] relative'>
          <p>🔗 내 링크를 받은 친구가 쪽지를 쓸 수 있어요!</p>
          <div className='absolute w-3 h-3 bg-black transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5'></div>
        </div>
      </div>
      {children}
    </div>
  )
}
