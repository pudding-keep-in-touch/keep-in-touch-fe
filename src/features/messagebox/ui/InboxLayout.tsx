'use client'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
// import { cn } from '@/shared/utils/emotionVariety'

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const userId = mockData.userId
  // const userId =
  //   typeof window !== 'undefined'
  //     ? localStorage.getItem('keep_in_touch_user_id')
  //     : null

  const router = useRouter()
  // const pathname = usePathname()

  // const makeBgClass = pathname.endsWith('/reaction')
  //   ? `bg-[#FFFFFF]`
  //   : `bg-[#F7F7FC]`

  return (
    <div
      className={
        'w-full min-h-screen flex flex-col items-center pb-16 px-6 bg-cover bg-center bg-[#F7F7FC]'
      }
    >
      <header className='w-full h-[50px] grid grid-cols-3 items-center z-50 '>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={() => router.back()}
        />
        <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
          쪽지함
        </h1>
      </header>
      {children}
    </div>
  )
}
