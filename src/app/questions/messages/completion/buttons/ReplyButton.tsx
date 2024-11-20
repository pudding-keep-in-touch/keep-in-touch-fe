'use client'

import PreviewButton from '@/app/questions/messages/completion/buttons/PreviewButton'
import SendButton from '@/app/questions/messages/completion/buttons/SendButton'

export default function ReplyButton() {
  return (
    <div className='w-full mt-auto grid grid-cols-2 gap-2'>
      <PreviewButton />
      <SendButton />
    </div>
  )
}
