'use client'

import { Textarea } from '@/shared/components/textarea'
import { useFormContext } from 'react-hook-form'

import React from 'react'
import { cn } from '@/shared/utils/emotionVariety'
import Image from 'next/image'
import { MessageFormValues } from '@/features/message/_send/model/formSchema'

interface WriteInputProps {
  isColor?: boolean
  type: string
  maxLength: number
}

export default function WriteInput({
  isColor,
  type,
  maxLength,
}: WriteInputProps) {
  const { watch, register } = useFormContext<MessageFormValues>()
  const { message } = watch()

  const errorFocuseStyle =
    message?.length >= maxLength
      ? 'focus-within:border-[#F42762]'
      : 'focus-within:border-[#35B6FF]'
  const errorFontColor =
    message?.length >= maxLength ? 'text-[#F42762]' : 'text-gray-400'
  const errorFlexStyle =
    message?.length >= maxLength ? 'justify-between' : 'justify-end'

  const backgroundColorStyle = isColor && 'bg-gray-1'

  const inputTypeStyle = type === 'question' ? 'h-[193px]' : 'h-[390px]'

  return (
    <div className='w-full'>
      <Textarea
        {...register('message')}
        className={cn(
          'resize-none rounded-2xl border p-5 border-white focus-visible:ring-offset-0 focus-visible:ring-0 scrollbar-hide',
          errorFocuseStyle,
          backgroundColorStyle,
          inputTypeStyle
        )}
        placeholder='글을 입력해 주세요'
        inputMode='text'
        maxLength={maxLength}
      />

      <div className={cn('flex mt-2 mb-2', errorFlexStyle)}>
        {message?.length >= maxLength && (
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
          {message?.length}/{maxLength}
        </p>
      </div>
    </div>
  )
}
