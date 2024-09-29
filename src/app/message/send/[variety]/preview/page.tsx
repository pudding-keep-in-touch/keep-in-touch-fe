'use client'

import MessageSendSubmitButton from '../complete/_components/submitButton'
import { useFormContext } from 'react-hook-form'
import { MessageFormValues } from '../_components/formSchema'

export default function Page() {
  const { getValues } = useFormContext<MessageFormValues>()

  const { message } = getValues()

  return (
    <>
      <div className='backdrop-blur-md bg-white/50 w-full min-h-[380px] rounded-2xl mt-[160px] px-6 py-5'>
        <p className='text-[#1F1F1F] font-bold text-lg mb-4'>To. 친구에게!</p>
        <p className='text-[#191F28] break-all whitespace-pre-wrap text-lg'>
          {message}
        </p>
      </div>
      <MessageSendSubmitButton />
    </>
  )
}
