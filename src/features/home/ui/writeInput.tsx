'use client'

import { Textarea } from '@/shared/components/textarea'
import { useFormContext } from 'react-hook-form'

import React from 'react'
import { cn } from '@/shared/utils/emotionVariety'
import Image from 'next/image'
import { QuestionFormValues } from '../model/formSchema'

interface WriteInputProps {
  isColor?: boolean
  type: string
  maxLength: number
  minLength: number
  setIsError: React.Dispatch<React.SetStateAction<boolean>>
  desc?: string
  onFocus?: () => unknown
  onBlur?: () => unknown
}

export default function WriteInput({
  isColor,
  type,
  maxLength,
  minLength,
  setIsError,
  desc,
  onFocus,
  onBlur,
}: WriteInputProps) {
  const { watch, register } = useFormContext<QuestionFormValues>()
  const { question } = watch()

  const error = question?.length > maxLength || question?.length < minLength

  const errorFocusStyle = error
    ? 'focus-within:border-[#F42762]'
    : 'focus-within:border-[#35B6FF]'
  const errorFontColor =
    question?.length > maxLength ? 'text-[#F42762]' : 'text-gray-400'
  const errorFlexStyle =
    question?.length > maxLength ? 'justify-between' : 'justify-end'

  const backgroundColorStyle = isColor && 'bg-gray-1'

  const inputTypeStyle = type === 'question' ? 'h-[193px]' : 'h-[390px]'

  React.useEffect(() => {
    if (!error) {
      setIsError(false)
    } else {
      setIsError(true)
    }
  }, [error])

  return (
    <div className='w-full'>
      <Textarea
        {...register('question')}
        className={cn(
          'resize-none rounded-2xl border p-5 border-white focus-visible:ring-offset-0 focus-visible:ring-0 scrollbar-hide',
          errorFocusStyle,
          backgroundColorStyle,
          inputTypeStyle
        )}
        placeholder={desc ? desc : '글을 입력해 주세요'}
        inputMode='text'
        maxLength={maxLength}
        minLength={minLength}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <div className={cn('flex mt-2 mb-2', errorFlexStyle)}>
        {question?.length > maxLength && (
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
          {question?.length}/{maxLength}
        </p>
      </div>
    </div>
  )
}
