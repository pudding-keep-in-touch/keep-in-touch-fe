'use client'

import { Button } from '@/shared/ui/components/Button'

export default function MessageSendButton() {
  return (
    <Button
      type='button'
      className='h-fit p-[18px] text-white rounded-2xl font-bold w-full'
    >
      코멘트 보내기
    </Button>
  )
}
