'use client'

import { Button } from '@/shared/components/Button'
import Image from 'next/image'

export default function MessageShareButton() {
  return (
    <Button
      type='button'
      variant='link'
      className='bg-[#CCE0EB] shrink-0 h-[56px] p-[18px] text-white rounded-2xl font-bold w-[62px]'
    >
      <Image src='/share.svg' alt='share icon' width={24} height={24} />
    </Button>
  )
}
