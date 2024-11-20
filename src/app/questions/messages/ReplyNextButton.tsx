'use client'

import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MessageFormValues } from '@/features/message/_send/model/formSchema'
import { Button } from '@/shared/components/Button'

export default function ReplyNextButton() {
  const router = useRouter()

  const { formState } = useFormContext<MessageFormValues>()
  const { isValid } = formState

  const onClick = () => {
    //todo questionId 변경 필요
    router.push(`/questions/messages/completion`)
  }

  return (
    <Button
      type='button'
      disabled={!isValid}
      className='h-fit p-4 bg-[#35B6FF] text-white rounded-2xl font-bold mt-auto w-full'
      onClick={onClick}
    >
      다음
    </Button>
  )
}
