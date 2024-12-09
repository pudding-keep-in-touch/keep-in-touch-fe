'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'
import { MessageFormValues } from '@/features/message/_send/model/formSchema'
import MessageSendSubmitButton from '@/features/message/_send/_completion/ui/submitButton'

export default function Page({
  params: { userId, variety },
}: {
  params: { userId: string; variety: string }
}) {
  const { getValues } = useFormContext<MessageFormValues>()

  const { message } = getValues()

  return (
    <>
      <div className='backdrop-blur-md bg-white/50 w-full h-full min-h-[380px] rounded-2xl mt-[160px] px-6 py-5'>
        <p className='text-[#1F1F1F] font-bold text-lg mb-4'>{`To. ${userId}에게!`}</p>
        <p className='text-[#191F28] break-all whitespace-pre-wrap text-lg'>
          {message}
        </p>
      </div>

      <MessageSendSubmitButton userId={userId} variety={variety} />
    </>
  )
}
