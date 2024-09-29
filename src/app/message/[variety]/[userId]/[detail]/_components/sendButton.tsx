'use client'

import { Button } from '@/shared/ui/components/Button'
import { useRouter } from 'next/navigation'
import { varietyType } from '../../_components/message'

export default function MessageSendButton({
  variety,
}: {
  variety: varietyType
}) {
  const userId = localStorage.getItem('keep_in_touch_user_id')
  const router = useRouter()

  const onClick = () => {
    if (userId) {
      router.push(`/message/${variety}/${userId}`)
    } else {
      router.back()
    }
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
