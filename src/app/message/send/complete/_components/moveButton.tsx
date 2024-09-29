'use client'

import { Button } from '@/shared/ui/components/Button'
import { useRouter } from 'next/navigation'

export default function MoveButton() {
  const router = useRouter()
  const moveHandler = () => {
    router.replace('/login')
  }
  return (
    <Button
      type='button'
      className='h-fit p-4 bg-[#35B6FF] text-lg text-white rounded-2xl font-bold w-full'
      onClick={moveHandler}
    >
      보낸 쪽지 확인하기
    </Button>
  )
}
