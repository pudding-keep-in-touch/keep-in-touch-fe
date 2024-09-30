'use client'

import { Button } from '@/shared/ui/components/Button'
import MessageSendSubmitButton from './submitButton'
import { useParams, useRouter } from 'next/navigation'
import { getVarietyNumber, MessageVariety } from '../../_utils/varieties'

interface MessageSendButtonsProps {
  emotion: string
  userId: number
}

export default function MessageSendButtons({
  emotion,
  userId,
}: MessageSendButtonsProps) {
  const router = useRouter()
  const params = useParams<{ variety: MessageVariety }>()
  const loginId = localStorage.getItem('keep_in_touch_user_id')
  const emotionId = getVarietyNumber(emotion as MessageVariety | undefined)

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
        userId={userId}
        loginId={Number(loginId)}
        emotionId={Number(emotionId)}
      />
    </div>
  )
}
