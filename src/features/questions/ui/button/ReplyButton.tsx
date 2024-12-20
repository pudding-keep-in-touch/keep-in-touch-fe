'use client'

import PreviewButton from '@/features/questions/ui/button/PreviewButton'
import SendButton from '@/features/questions/ui/button/SendButton'

export default function ReplyButton() {
  return (
    <div className='w-full mt-auto grid grid-cols-2 gap-2'>
      <PreviewButton />
      <SendButton />
    </div>
  )
}
