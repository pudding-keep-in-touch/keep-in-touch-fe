'use client'

import { Button } from '@/shared/ui/components/Button'
import Image from 'next/image'

export default function GoogleButton() {
  return (
    <Button
      type='button'
      className='h-fit p-[18px] text-[#1F1F1F] bg-[#F2F2F2] rounded-2xl font-bold w-full relative'
      variant='secondary'
    >
      <Image
        src='/google.svg'
        alt='google icon'
        width={20}
        height={20}
        className='absolute left-6'
      />
      <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
        구글로 로그인하기
      </h1>
    </Button>
  )
}
