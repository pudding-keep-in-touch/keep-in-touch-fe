'use client'

import { Button } from '@/shared/ui/components/Button'
import { WriteFormValues } from './formSchema'
import { useFormContext } from 'react-hook-form'
import { useFormStatus } from 'react-dom'

export default function MessageWriteSubmitButton() {
  const { formState } = useFormContext<WriteFormValues>()
  const { pending } = useFormStatus()
  const { isValid } = formState

  return (
    <Button
      type='submit'
      disabled={!isValid || pending}
      className='h-fit p-4 bg-[#35B6FF] text-white rounded-2xl font-bold mt-auto w-full'
    >
      {pending ? '생성 중...' : '완료'}
    </Button>
  )
}
