'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  defaultValues,
  questionFormSchema,
  QuestionFormValues,
} from '../model/formSchema'

interface Props {
  children: React.ReactNode
}

export default function QuestionFormProvider({ children }: Props) {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
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
