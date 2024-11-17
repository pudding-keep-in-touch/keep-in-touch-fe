'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'
import { MessageFormValues } from '@/features/message/_send/model/formSchema'

export default function Page({
  params: { userId },
}: {
  params: { userId: number }
}) {
  const { getValues } = useFormContext<MessageFormValues>()
  const router = useRouter()

  const { message } = getValues()

  const clickHandler = () => {
    router.back()
  }

  return (
    <>
      <div className='backdrop-blur-md bg-white/50 w-full h-full min-h-[380px] rounded-2xl mt-[160px] px-6 py-5'>
        <p className='text-[#1F1F1F] font-bold text-lg mb-4'>{`To. ${userId}에게!`}</p>
        <p className='text-[#191F28] break-all whitespace-pre-wrap text-lg'>
          {message}
        </p>
      </div>
      <Button
        type='button'
        className='h-fit p-[18px] bg-[#1F1F1F] text-white rounded-2xl font-bold w-full mt-auto'
        onClick={clickHandler}
      >
        완료
      </Button>
    </>
  )
}
