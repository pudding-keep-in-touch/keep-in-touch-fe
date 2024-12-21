'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/shared/components/Button'
import Link from 'next/link'

export default function MessageSendNextButton({ userId }: { userId: string }) {
  const searchParams = useSearchParams()

  const variety = searchParams.get('variety')

  return (
    <Link href={`/message/send/${userId}/${variety}/write`} className='w-full'>
      <Button
        type='button'
        disabled={!variety}
        className='h-fit p-4 bg-[#35B6FF] text-white rounded-2xl font-bold mt-5 w-full'
      >
        다음
      </Button>
    </Link>
  )
}
