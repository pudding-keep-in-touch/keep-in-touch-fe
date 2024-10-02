'use client'

import { Button } from '@/shared/ui/components/Button'
import { useRouter } from 'next/navigation'

export default function MoveButton({
  dmId,
  variety,
}: {
  dmId: string
  variety: string
}) {
  const userId = localStorage.getItem('keep_in_touch_user_id')
  const router = useRouter()
  const moveHandler = () => {
    router.push(`/message/sent/${userId}/${variety}/${dmId}?base=sent`)
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