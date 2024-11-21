'use client'

import { Button } from '@/shared/components/Button'
import { useParams, useRouter } from 'next/navigation'
import MessageSendSubmitButton from './submitButton'
import {
  getVarietyNumber,
  MessageVariety,
} from '@/entities/message/utils/messageVarieties'

interface MessageSendButtonsProps {
  variety: string
  userId: number
}

export default function MessageSendButtons({
  variety,
  userId,
}: MessageSendButtonsProps) {
  const router = useRouter()
  const params = useParams<{ variety: MessageVariety }>()
  const emotionId = getVarietyNumber(variety as MessageVariety | undefined)

  const clickHandler = () => {
    router.push(`/message/send/${userId}/${params.variety}/preview`)
  }

  return (
    <div className='w-full mt-auto grid grid-cols-2 gap-2'>
      <Button
        type='button'
        className='w-full h-fit p-4 text-[#1F1F1F] bg-[#CCE0EB] rounded-2xl font-bold hover:bg-slate-300'
        onClick={clickHandler}
      >
        미리보기
      </Button>

      <MessageSendSubmitButton
        userId={Number(userId)}
        emotionId={Number(emotionId)}
        variety={variety}
      />
    </div>
  )
}
