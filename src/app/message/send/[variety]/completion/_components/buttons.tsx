'use client'

import { Button } from '@/shared/ui/components/Button'
import MessageSendSubmitButton from './submitButton'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { getVarietyNumber, MessageVariety } from '../../_utils/varieties'
import { usePostSendMessage } from '@/entities/message/api/mutation'

interface MessageSendButtonsProps {
  emotion: string
}

export default function MessageSendButtons({
  emotion,
}: MessageSendButtonsProps) {
  const router = useRouter()
  const params = useParams<{ variety: MessageVariety }>()
  const userId = localStorage.getItem('keep_in_touch_user_id')
  const emotionId = getVarietyNumber(emotion as MessageVariety | undefined)

  const clickHandler = () => {
    router.push(`/message/send/${params.variety}/preview`)
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
      />
    </div>
  )
}
