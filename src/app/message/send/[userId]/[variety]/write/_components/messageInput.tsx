'use client'

import { Textarea } from '@/shared/ui/ui/textarea'
import { useFormContext } from 'react-hook-form'
import { MessageFormValues } from '../../_components/formSchema'
import React, { useEffect } from 'react'

// interface MessageInputProps {
//   setSendMessage: React.Dispatch<React.SetStateAction<string>>
// }

export default function MessageInput() {
  const { watch, register } = useFormContext<MessageFormValues>()
  const { message } = watch()

  // useEffect(() => {
  //   setSendMessage(message)
  // }, [message])

  return (
    <div className='w-full'>
      <Textarea
        {...register('message')}
        className='resize-none h-[390px] rounded-2xl border-2 p-[30px] border-white focus-visible:ring-offset-0 focus-visible:ring-0 focus-within:border-[#35B6FF]'
        placeholder='글을 입력해 주세요'
        inputMode='text'
        maxLength={200}
      />
      <p className='text-xs text-gray-400 mt-2 px-2 text-right'>
        {message?.length}/200
      </p>
    </div>
  )
}
