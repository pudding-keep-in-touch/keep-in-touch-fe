'use client'

import { useFormContext } from 'react-hook-form'
import { MessageFormValues } from '@/features/message/_send/model/formSchema'
import MessageSendSubmitButton from '@/features/message/_send/_completion/ui/submitButton'
import { useGetNickname } from '@/features/questions/hooks/query/useNicknameQuery'

export default function Page({
  params: { userId, variety },
}: {
  params: { userId: string; variety: string }
}) {
  const { getValues } = useFormContext<MessageFormValues>()

  const { message } = getValues()

  const { data: nickname } = useGetNickname(userId ?? '')

  return (
    <>
      <div className='backdrop-blur-md bg-white/50 w-full h-full min-h-[380px] rounded-2xl mt-[180px] custom-md:mt-[250px] lg:mt-[280px] px-6 py-5'>
        <p className='text-[#1F1F1F] font-bold text-lg mb-4'>{`To. ${nickname}에게!`}</p>
        <p className='text-[#191F28] break-all whitespace-pre-wrap text-lg'>
          {message}
        </p>
      </div>

      <MessageSendSubmitButton userId={userId} variety={variety} />
    </>
  )
}
