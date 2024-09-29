'use client'

import { Button } from '@/shared/ui/components/Button'
import { useFormContext } from 'react-hook-form'
import { useFormStatus } from 'react-dom'
import { MessageFormValues } from '../../_components/formSchema'
import { usePostSendMessage } from '@/entities/message/api/mutation'
import { useRouter } from 'next/navigation'

interface MessageSendSubmitButtonProps {
  userId: number
  emotionId: number
}

export default function MessageSendSubmitButton({
  userId,
  emotionId,
}: MessageSendSubmitButtonProps) {
  const router = useRouter()
  const { formState, getValues } = useFormContext<MessageFormValues>()
  const { pending } = useFormStatus()
  const { isValid } = formState

  const { mutateAsync, isPending } = usePostSendMessage()

  const submitHandler = async () => {
    try {
      const formValues = getValues()
      await mutateAsync({
        receiverId: Number(userId),
        emotionId: emotionId || 1,
        content: formValues.message,
      })

      router.replace('/message/send/complete')
    } catch (error) {
      console.log('쪽지 보내기에 실패했습니다.')
    }
  }

  return (
    <Button
      type='submit'
      disabled={!isValid || pending}
      className='h-fit p-4 bg-[#1F1F1F] text-white rounded-2xl font-bold w-full mt-auto'
      onClick={submitHandler}
    >
      {pending ? '보내는 중...' : '쪽지 보내기'}
    </Button>
  )
}
