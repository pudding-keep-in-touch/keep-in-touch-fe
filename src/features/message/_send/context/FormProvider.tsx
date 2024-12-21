'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  defaultValues,
  messageFormSchema,
  MessageFormValues,
} from '../model/formSchema'

interface Props {
  children: React.ReactNode
}

export default function MessageFormProvider({ children }: Props) {
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    defaultValues,
  })

  const onSubmit = async () => {
    const valid = await form.trigger()
    if (!valid) {
      return
    }

    console.log('!TODO API 호출')
  }

  return (
    <FormProvider {...form}>
      <form
        action={onSubmit}
        className='w-full flex-1 flex flex-col items-center'
      >
        {children}
      </form>
    </FormProvider>
  )
}
