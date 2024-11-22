'use client'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/shared/utils/emotionVariety'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const makeBgClass = pathname.endsWith('/reaction')
    ? 'bg-[#FFFFFF]'
    : 'bg-messageDetail'

  return (
    <div
      className={cn(
        'w-full min-h-screen flex flex-col bg-cover bg-center items-center pb-16 px-6',
        makeBgClass
      )}
    >
      <header className='w-full h-[50px] flex justify-between items-center z-50 '>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={() => router.back()}
        />
        <button type='button'>
          <img src='/header_more.svg' />
        </button>
      </header>
      {children}
    </div>
  )
}
