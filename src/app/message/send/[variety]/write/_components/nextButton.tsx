'use client'

import { Button } from '@/shared/ui/components/Button'
import { useFormContext } from 'react-hook-form'
import { MessageFormValues } from '../../_components/formSchema'
import { useParams, useRouter } from 'next/navigation'
import { MessageVariety } from '../../_utils/varieties'

export default function MessageWriteNextButton() {
  const params = useParams<{ variety: MessageVariety }>()
  const router = useRouter()

  const { formState } = useFormContext<MessageFormValues>()
  const { isValid } = formState

  const onClick = () => {
    router.push(`/message/send/${params.variety}/complete`)
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
