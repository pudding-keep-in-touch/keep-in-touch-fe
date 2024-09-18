'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { WriteFormValues, defaultValues, writeFormSchema } from './formSchema'
import MessageWriteSubmitButton from './submitButton'
import { zodResolver } from '@hookform/resolvers/zod'
import MessageInput from './messageInput'

export default function MessageWriteForm() {
  const form = useForm<WriteFormValues>({
    resolver: zodResolver(writeFormSchema),
    defaultValues,
  })

  const onSubmit = async () => {
    const valid = await form.trigger()
    if (!valid) {
      return
    }

    console.log('submit')
  }

  return (
    <FormProvider {...form}>
      <form action={onSubmit} className='w-full flex-1 flex flex-col gap-5'>
        <MessageInput />

        <MessageWriteSubmitButton />
      </form>
    </FormProvider>
  )
}
