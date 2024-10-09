import { z } from 'zod'

export const messageFormSchema = z.object({
  message: z.string().min(1).max(200),
})

export type MessageFormValues = z.infer<typeof messageFormSchema>

export const defaultValues: Partial<MessageFormValues> = {
  message: '',
}
