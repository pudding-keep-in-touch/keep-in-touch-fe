'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@/shared/ui/components/Button'
import { useRouter } from 'next/navigation'
import { MessageFormValues } from '@/app/message/send/[userId]/[variety]/_components/formSchema'

export default function PreviewPage() {
  const { getValues } = useFormContext<MessageFormValues>()
  const router = useRouter()

  const { message } = getValues()

  const clickHandler = () => {
    router.push(`/questions/reply/complete`)
  }

  return (
    <>
      {/* todo 질문 내용 추가 */}
      <div className='backdrop-blur-md bg-white/50 w-full h-full min-h-[380px] rounded-2xl mt-[160px] px-6 py-5 mb-3'>
        <p className='text-[#1F1F1F] font-bold text-lg mb-4'>{`To. 친구에게!`}</p>
        <p className='text-[#191F28] break-all whitespace-pre-wrap text-lg'>
          {message}
        </p>
      </div>
      <div className='text-white text-left w-full'>
        *쪽지는 모두 익명으로 전달됩니다
      </div>
      <Button
        type='button'
        className='h-fit p-[18px] bg-[#1F1F1F] text-white rounded-2xl font-bold w-full mt-auto'
        onClick={clickHandler}
      >
        쪽지 보내기
      </Button>
    </>
  )
}
