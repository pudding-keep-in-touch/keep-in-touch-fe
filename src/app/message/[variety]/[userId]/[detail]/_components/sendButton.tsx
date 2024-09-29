'use client'

import { Button } from '@/shared/ui/components/Button'
import { useRouter } from 'next/navigation'

export default function MessageSendButton() {
  const router = useRouter()

  const onClick = () => {
    router.back()
  }
  return (
    <Button
      onClick={onClick}
      type='button'
      className='h-fit p-[18px] text-white rounded-2xl font-bold w-full'
    >
      완료
    </Button>
  )
}
