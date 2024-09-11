'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/shared/ui/components/Button'

export default function MessageSendNextButton() {
  const searchParams = useSearchParams()

  const variety = searchParams.get('variety')

  return (
    <Button
      type='button'
      disabled={!variety}
      className='h-fit p-4 bg-[#35B6FF] text-white rounded-2xl font-bold mt-5 w-full'
    >
      다음
    </Button>
  )
}
