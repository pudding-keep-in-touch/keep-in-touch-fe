'use client'

import { Button } from '@/shared/ui/components/Button'
import MessageSendSubmitButton from './submitButton'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MessageVariety } from '../../_utils/varieties'

export default function MessageSendButtons() {
  const params = useParams<{ variety: MessageVariety }>()

  return (
    <div className='w-full mt-auto grid grid-cols-2 gap-2'>
      <Link href={`/message/send/${params.variety}/preview`}>
        <Button
          type='button'
          className='w-full h-fit p-4 text-[#1F1F1F] bg-[#CCE0EB] rounded-2xl font-bold hover:bg-slate-300'
        >
          미리보기
        </Button>
      </Link>

      <MessageSendSubmitButton />
    </div>
  )
}
