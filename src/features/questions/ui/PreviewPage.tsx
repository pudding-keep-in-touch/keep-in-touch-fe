'use client'

import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MessageFormValues } from '@/features/message/_send/model/formSchema'
import { Button } from '@/shared/components/Button'
import { useQueryClient } from '@tanstack/react-query'
import QuestionBox from '@/shared/components/QuestionBox'
import { useGetNickname } from '@/features/questions/hooks/query/useNicknameQuery'

export default function PreviewPage() {
  const { getValues } = useFormContext<MessageFormValues>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { message } = getValues()

  const selectedQuestion = queryClient.getQueryData<{
    questionId: string
    content: string
    userId: string
  }>(['selectedQuestion'])

  console.log('selectedQuestion', selectedQuestion)

  const userId = selectedQuestion?.userId

  const { data: nickname } = useGetNickname(userId ?? '')

  const onClickSendHandler = () => {
    router.push(`/questions/messages/complete`)
  }

  return (
    <>
      <div className='w-full max-w-[32rem] px-6 py-4'>
        <QuestionBox
          key={selectedQuestion?.questionId}
          questionId={selectedQuestion?.questionId}
          content={selectedQuestion?.content}
        />
      </div>
      <div className='backdrop-blur-md bg-white/50 w-full h-full min-h-[380px] rounded-2xl mt-4 px-6 py-5 mb-3'>
        <p className='text-[#1F1F1F] font-bold text-lg mb-4'>{`To. ${nickname}에게`}</p>
        <p className='text-[#191F28] break-all whitespace-pre-wrap text-lg'>
          {message}
        </p>
      </div>
      <div className='text-white text-left w-full text-sm'>
        *쪽지는 모두 익명으로 전달됩니다
      </div>
      <Button
        type='button'
        className='h-fit p-[18px] bg-[#1F1F1F] text-white rounded-2xl font-bold w-full mt-auto'
        onClick={onClickSendHandler}
      >
        쪽지 보내기
      </Button>
    </>
  )
}
