'use client'

import { useFormContext } from 'react-hook-form'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { MessageFormValues } from '@/features/message/_send/model/formSchema'
import { usePostSendMessage } from '@/features/message/_send/api/sendMutation'
import { Button } from '@/shared/components/Button'

export default function SendButton({}) {
  const router = useRouter()
  const { formState, handleSubmit } = useFormContext<MessageFormValues>()
  const { pending } = useFormStatus()
  const { isValid } = formState

  const { mutateAsync } = usePostSendMessage()

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      const response = await mutateAsync({
        receiverId: 1,
        emotionId: 1,
        content: formValues.message,
      })

      if (response && response.dmId) {
        router.push(`/questions/reply/complete`)
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
