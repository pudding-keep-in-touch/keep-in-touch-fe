'use client'

import { API_BASE_URL } from '@/shared/config'
import { Button } from '@/shared/ui/components/Button'
import Image from 'next/image'
import { useState } from 'react'

export default function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    try {
      window.location.href = `${API_BASE_URL}v1/auth/google/login`
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      type='button'
      className='h-fit p-[18px] text-[#1F1F1F] bg-[#F2F2F2] rounded-2xl font-bold w-full relative'
      variant='secondary'
      onClick={handleLogin}
      disabled={isLoading}
    >
      <Image
        src='/google.svg'
        alt='google icon'
        width={20}
        height={20}
        className='absolute left-6'
      />
      <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
        {isLoading ? '로그인 중...' : '구글로 로그인하기'}
      </h1>
    </Button>
  )
}
