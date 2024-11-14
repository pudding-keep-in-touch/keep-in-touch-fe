'use client'

import React from 'react'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NavigationBar } from './NavigationBar'

interface InboxLayoutProps {
  children: React.ReactNode
}

export default function InboxLayout({ children }: InboxLayoutProps) {
  const router = useRouter()

  const backHandler = () => {
    router.back()
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center pb-16 px-6 bg-cover bg-center bg-[#F7F7FC]'>
      <header className='w-full h-[50px] grid grid-cols-3 items-center z-50 '>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={backHandler}
        />
        <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
          쪽지함
        </h1>
      </header>

      {children}
      <NavigationBar />
    </div>
  )
}
