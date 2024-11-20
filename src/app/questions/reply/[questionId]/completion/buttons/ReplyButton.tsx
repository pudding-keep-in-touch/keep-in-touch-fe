'use client'

import PreviewButton from '@/app/questions/reply/[questionId]/completion/buttons/PreviewButton'
import SendButton from '@/app/questions/reply/[questionId]/completion/buttons/SendButton'

type ReplyButtonType = {
  questionId: number
}

export default function ReplyButton({ questionId }: ReplyButtonType) {
  return (
    <div className='w-full mt-auto grid grid-cols-2 gap-2'>
      <PreviewButton questionId={questionId} />
      <SendButton />
    </div>
  )
}
