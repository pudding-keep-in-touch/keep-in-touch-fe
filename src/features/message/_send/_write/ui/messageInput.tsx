'use client'

import { Textarea } from '@/shared/components/textarea'
import { useFormContext } from 'react-hook-form'
import { MessageFormValues } from '../../model/formSchema'
import React from 'react'
import { cn } from '@/shared/utils/emotionVariety'
import Image from 'next/image'

export default function MessageInput() {
  const { watch, register } = useFormContext<MessageFormValues>()
  const { message } = watch()

  const errorFocuseStyle =
    message?.length >= 200
      ? 'focus-within:border-[#F42762]'
      : 'focus-within:border-[#35B6FF]'

  const errorFontColor =
    message?.length >= 200 ? 'text-[#F42762]' : 'text-gray-400'

  const errorFlexStyle =
    message?.length >= 200 ? 'justify-between' : 'justify-end'

  return (
    <div className='w-full'>
      <Textarea
        {...register('message')}
        className={cn(
          'resize-none h-[390px] rounded-2xl border-2 p-[30px] border-white focus-visible:ring-offset-0 focus-visible:ring-0',
          errorFocuseStyle
        )}
        placeholder='글을 입력해 주세요'
        inputMode='text'
        maxLength={200}
      />
      <div className={cn('flex mt-2 mb-2', errorFlexStyle)}>
        {message?.length >= 200 && (
          <div className='flex justify-start items-center gap-1'>
            <p className='text-xs text-[#F42762]'>최대글자수 제한</p>
            <Image
              src='/error_icon.svg'
              alt='error_icon'
              width={13}
              height={13}
            />
          </div>
        )}
        <p className={cn('text-xs text-right', errorFontColor)}>
          {message?.length}/200
        </p>
      </div>
    </div>
  )
}
