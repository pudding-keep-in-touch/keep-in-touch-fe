'use client'

import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface CompleteButtonProps {
  userId: number
  isDisabled: boolean
  keyboardHeight: number
}

export default function CompleteButton({
  userId,
  isDisabled,
  keyboardHeight,
}: CompleteButtonProps) {
  const router = useRouter()

  const onClickComplete = () => {
    if (!isDisabled) {
      router.back()
    } else {
      toast('질문 작성이 필요합니다')
    }
  }

  return (
    <Button
      type='button'
      className='h-fit p-[18px] bg-system-blue text-white rounded-2xl font-bold w-full'
      disabled={isDisabled}
      onClick={() => {
        console.log('Bottom:', keyboardHeight)
        onClickComplete()
      }}
    >
      <h1 className='text-lg font-semibold text-center'>작성 완료</h1>
    </Button>
  )
}
