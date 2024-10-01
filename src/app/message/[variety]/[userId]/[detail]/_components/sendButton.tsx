'use client'

import { Button } from '@/shared/ui/components/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { varietyType } from '../../_components/message'

export default function MessageSendButton({
  variety,
}: {
  variety: varietyType
}) {
  const userId = localStorage.getItem('keep_in_touch_user_id')
  const router = useRouter()
  const param = useSearchParams()
  const baseUrl = param.get('base')

  const onClick = () => {
    if (userId) {
      if (baseUrl === 'home') {
        router.replace(`/message/${variety}/${userId}?base=${baseUrl}`)
      } else if (baseUrl === 'sent') {
        router.push(`/message/received/${userId}?base=${baseUrl}`)
      } else {
        router.replace(`/message/${variety}/${userId}`)
      }
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
