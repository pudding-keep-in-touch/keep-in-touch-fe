'use client'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/shared/utils/emotionVariety'
import { NavigationBar } from '@/shared/ui/layouts/NavigationBar'

export default function InboxLayout({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  // const userId = mockData.userId
  // const userId =
  //   typeof window !== 'undefined'
  //     ? localStorage.getItem('keep_in_touch_user_id')
  //     : null

  const router = useRouter()
  const pathname = usePathname()

  const makeBgClass = pathname.endsWith('/reaction')
    ? `bg-[#FFFFFF]`
    : `bg-[#F7F7FC]`

  const makePxClass = pathname.endsWith('/reaction') ? `px-0` : `px-6`
  return (
    <div
      className={cn(
        'w-full min-h-screen flex flex-col items-center bg-cover bg-center',
        makeBgClass
      )}
    >
      <div className={cn('flex w-full justify-center', makePxClass)}>
        <header className='w-full h-[50px] grid grid-cols-3 items-center z-50 '>
          <ChevronLeftIcon
            className='w-6 h-6 cursor-pointer'
            onClick={() => router.back()}
          />
          <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
            {title}
          </h1>
        </header>
      </div>
      {children}
      <NavigationBar />
    </div>
  )
}
