'use client'

import { Button } from '@/shared/ui/components/Button'

export default function LinkShareButton() {
  return (
    <Button
      type='button'
      className='h-fit p-[18px] bg-[#0788D1] text-white rounded-2xl font-bold w-full'
    >
      <h1 className='text-lg font-semibold text-center'>내 링크 전달하기</h1>
    </Button>
  )
}
