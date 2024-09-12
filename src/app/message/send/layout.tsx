'use client'

import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const router = useRouter()

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#F7F7FC] px-6 pb-16'>
      <header className='w-full h-[50px] grid grid-cols-3 items-center'>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={() => router.back()}
        />
        <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
          To. 친구에게
        </h1>
      </header>
      {children}
    </div>
  )
}
