'use client'

import { Button } from '@/shared/ui/components/Button'
import { useFormContext } from 'react-hook-form'
import { useFormStatus } from 'react-dom'
import { MessageFormValues } from '../../_components/formSchema'
import { usePostSendMessage } from '@/entities/message/api/mutation'
import { useRouter } from 'next/navigation'

interface MessageSendSubmitButtonProps {
  loginId: number
  emotionId: number
  userId: number
}

export default function MessageSendSubmitButton({
  loginId,
  emotionId,
  userId,
}: MessageSendSubmitButtonProps) {
  const router = useRouter()
  const { formState, getValues, handleSubmit } =
    useFormContext<MessageFormValues>()
  const { pending } = useFormStatus()
  const { isValid } = formState

  const { mutateAsync, isPending } = usePostSendMessage()

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      const response = await mutateAsync({
        receiverId: Number(loginId),
        emotionId: emotionId || 1,
        content: formValues.message,
      })

      if (response && response.dmId) {
        router.push(`/message/send/${userId}/complete/${response.dmId}`)
      } else {
        console.error('dmId가 응답에 없습니다:', response)
      }
    } catch (error) {
      console.log('쪽지 보내기에 실패했습니다.')
    }
  })

  return (
    <Button
      type='submit'
      disabled={!isValid || pending}
      className='h-fit p-4 bg-[#1F1F1F] text-white rounded-2xl font-bold w-full mt-auto'
      onClick={onSubmit}
    >
      {pending ? '보내는 중...' : '쪽지 보내기'}
    </Button>
  )
}
