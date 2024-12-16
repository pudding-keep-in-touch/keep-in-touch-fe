'use client'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/shared/utils/emotionVariety'
import { Nav } from '@/shared/components/nav'
export default function InboxLayout({
  children,
  title,
  userId,
  messageType,
}: {
  children: React.ReactNode
  title: string
  userId: string
  messageType: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  const makeBgClass = pathname.endsWith('/reaction')
    ? `bg-[#FFFFFF]`
    : `bg-[#F7F7FC]`

  const makePxClass = pathname.endsWith('/reaction') ? `px-0` : `px-6`
  return (
    <div
      className={cn(
        'relative w-full pb-safe-bottom z-0 h-screen-safe flex flex-col items-center bg-cover bg-center',
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
      <div className='relative w-full h-full overflow-y-scroll scrollbar-hide'>
        {children}
      </div>
      <Nav
        type='messagebox'
        userId={userId}
        isNew={false}
        messageType={messageType}
      />
    </div>
  )
}
