'use client'

import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MessageFormValues } from '@/features/message/_send/model/formSchema'
import { Button } from '@/shared/components/Button'
import { usePostMessage } from '@/features/questions/hooks/query/useQuestionQuery'
import { useQueryClient } from '@tanstack/react-query'

export default function SendButton() {
  const router = useRouter()
  const { formState, handleSubmit } = useFormContext<MessageFormValues>()
  const { isValid } = formState
  const queryClient = useQueryClient()

  const selectedQuestion = queryClient.getQueryData<{
    questionId: string
    content: string
    userId: string
  }>(['selectedQuestion'])

  console.log('selectedQuestion', selectedQuestion)

  // `usePostMessage` 훅 호출
  const { mutateAsync, status } = usePostMessage()

  const isLoading = status === 'pending'

  const onSubmit = handleSubmit(async (formValues) => {
    console.log('click')
    console.log('formValues', formValues)
    try {
      // `usePostMessage`를 사용해 메시지 전송
      const response = await mutateAsync({
        receiverId: selectedQuestion?.userId || '', // receiverId를 실제 데이터로 교체
        content: formValues.message,
        questionId: selectedQuestion?.questionId, // questionId를 실제 데이터로 교체
        // emotionId: '', // emotionId를 실제 데이터로 교체
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
      className='h-fit p-4 bg-[#1F1F1F] text-white rounded-2xl font-bold w-full mt-auto'
      onClick={onSubmit}
    >
      {isLoading ? '보내는 중...' : '전송하기'}
    </Button>
  )
}
