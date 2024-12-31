'use client'
import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Nav } from '@/shared/components/nav'

export default function InboxLayout({
  children,
  title,
  userId,
  type,
}: {
  children: React.ReactNode
  title: string
  userId: string
  type: string
}) {
  const router = useRouter()
  const param = useParams()
  console.log(param)
  const backHandler = () => {
    if (type) {
      router.replace(`/messagebox/${userId}`)
    } else {
      router.back()
    }
  }
  return (
    <div className='w-full h-full flex flex-col overflow-auto'>
      <div className='flex-grow w-full overflow-y-auto scrollbar-hide'>
        <div className='relative w-full pb-safe-bottom z-0 h-screen-safe flex flex-col items-center bg-cover bg-center'>
          <div className='flex w-full justify-center bg-[#F7F7FC] px-6'>
            <header className='w-full h-[50px] grid grid-cols-3 items-center z-50 '>
              <ChevronLeftIcon
                className='w-6 h-6 cursor-pointer'
                onClick={backHandler}
              />
              <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
                {title}
              </h1>
            </header>
          </div>
          <div className='relative w-full h-full overflow-y-scroll scrollbar-hide bg-[#F7F7FC]'>
            {children}
          </div>
          <Nav type='messagebox' userId={userId} messageType={type} />
        </div>
      </div>
    </div>
  )
}
