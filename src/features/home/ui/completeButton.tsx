'use client'

import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface CompleteButtonProps {
  userId: string
  isDisabled: boolean
  keyboardHeight: number
  onSubmit: () => unknown
}

export default function CompleteButton({
  userId,
  isDisabled,
  keyboardHeight,
  onSubmit,
}: CompleteButtonProps) {
  const router = useRouter()

  console.log('isDisabled', isDisabled)

  const onClickComplete = () => {
    console.log('onClickComplete 실행됨!')
    if (!isDisabled) {
      console.log('onSubmit 실행!')
      onSubmit()
    } else {
      console.log('버튼 비활성화 상태')
      toast('질문 작성이 필요합니다')
    }
  }
  return (
    <Button
      type='submit'
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
