'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/utils/emotionVariety'

export default function Layout({
  children,
  modal,
}: {
  modal: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const makeBgClass = pathname.endsWith('/reaction')
    ? 'bg-[#FFFFFF]'
    : 'bg-messageDetail'
  return (
    <div
      className={cn(
        'relative w-full pb-safe-bottom z-0 h-screen-safe flex flex-col bg-cover bg-center items-center',
        makeBgClass
      )}
    >
      <div className='relative w-full h-full z-0 overflow-y-scroll scrollbar-hide'>
        {children}
        {modal}
      </div>
    </div>
  )
}
