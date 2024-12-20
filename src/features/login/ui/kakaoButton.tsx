'use client'

import { API_BASE_URL } from '@/shared/config/env'
import { Button } from '@/shared/components/Button'
import Image from 'next/image'
import { useState } from 'react'

export default function KakaoButton() {
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
      className='h-fit p-[18px] text-[#1F1F1F] bg-[#FEE500] rounded-2xl font-bold w-full relative'
      variant='secondary'
      onClick={handleLogin}
      disabled={isLoading}
    >
      <Image
        src='/kakao.svg'
        alt='kakao icon'
        width={20}
        height={20}
        className='absolute left-6'
      />
      <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
        {isLoading ? '로그인 중...' : '카카오로 로그인하기'}
      </h1>
    </Button>
  )
}
