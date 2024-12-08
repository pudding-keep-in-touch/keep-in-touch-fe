'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/shared/components/Button'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MessageFormValues } from '@/features/message/_send/model/formSchema'
import { usePostMessage } from '@/features/questions/hooks/query/useQuestionQuery'

interface MessageSendSubmitButtonProps {
  userId: string
  variety: string
}

export default function MessageSendSubmitButton({
  userId,
  variety,
}: MessageSendSubmitButtonProps) {
  const router = useRouter()
  const { formState, handleSubmit } = useFormContext<MessageFormValues>()
  const { pending } = useFormStatus()
  const { isValid } = formState

  const { mutateAsync } = usePostMessage()

  const emotionId = variety === 'thanks' ? '1' : '2'

  const onSubmit = handleSubmit(async (formValues) => {
    console.log('click')
    console.log('formValues', formValues)
    try {
      // `usePostMessage`를 사용해 메시지 전송
      const response = await mutateAsync({
        receiverId: userId || '', // receiverId를 실제 데이터로 교체
        content: formValues.message,
        emotionId: emotionId, // emotionId를 실제 데이터로 교체
      })

      if (response?.messageId) {
        console.log('response', response)
        // 성공적으로 전송 후 라우팅
        router.push(`/questions/messages/complete`)
      } else {
        console.error('응답에 messageId가 없습니다:', response)
      }
    } catch (error) {
      console.error('쪽지 보내기에 실패했습니다:', error)
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
