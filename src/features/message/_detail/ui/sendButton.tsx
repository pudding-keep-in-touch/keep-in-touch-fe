'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { MessageType } from '@/shared/types/common.types'
import { Button } from '@/shared/components/Button'

export default function MessageSendButton({
  messageType,
}: {
  messageType: MessageType
}) {
  const userId =
    typeof window !== 'undefined'
      ? localStorage.getItem('keep_in_touch_user_id')
      : null
  const router = useRouter()
  const param = useSearchParams()
  const baseUrl = param.get('base')

  const onClick = () => {
    if (userId) {
      if (baseUrl === 'home') {
        router.replace(`/message/${messageType}/${userId}?base=${baseUrl}`)
      } else if (baseUrl === 'sent') {
        router.push(`/message/sent/${userId}?base=${baseUrl}`)
      } else {
        router.replace(`/message/${messageType}/${userId}`)
      }
    } else {
      router.back()
    }
  }

  return (
    <Button
      onClick={onClick}
      type='button'
      className='h-fit p-[18px] text-white rounded-2xl font-bold w-full mt-auto'
    >
      완료
    </Button>
  )
}
