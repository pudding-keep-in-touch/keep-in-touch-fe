'use client'

import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BottomBar from './bottomBar'
import Image from 'next/image'

export default function Profile({ userId }: { userId: string }) {
  const router = useRouter()

  return (
    <div className='relative w-full min-h-screen'>
      <header className='w-full h-[50px] grid grid-cols-3 items-center px-6'>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={() => router.back()}
        />
        <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
          프로필
        </h1>
      </header>

      {/* <div className='px-5 py-6 w-full'>
        <Image
          src='/Profile_Icon.svg'
          alt='profile icon'
          width={80}
          height={80}
        />
      </div> */}

      <div className='absolute bottom-0 left-0 w-full flex flex-col gap-[75px]'>
        <div className='w-full h-fit'>
          <BottomBar />
        </div>
      </div>
    </div>
  )
}
