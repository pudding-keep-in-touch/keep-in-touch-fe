'use client'

import { Button } from '@/shared/ui/components/Button'
import { useFormContext } from 'react-hook-form'
import { useFormStatus } from 'react-dom'
import { MessageFormValues } from '../../_components/formSchema'

export default function MessageSendSubmitButton() {
  const { formState } = useFormContext<MessageFormValues>()
  const { pending } = useFormStatus()
  const { isValid } = formState

  return (
    <Button
      type='submit'
      disabled={!isValid || pending}
      className='h-fit p-4 bg-[#1F1F1F] text-white rounded-2xl font-bold w-full mt-auto'
    >
      {pending ? '보내는 중...' : '쪽지 보내기'}
    </Button>
  )
}
