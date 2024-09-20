import { z } from 'zod'

export const writeFormSchema = z.object({
  message: z.string().min(1).max(200),
})

export type WriteFormValues = z.infer<typeof writeFormSchema>

export const defaultValues: Partial<WriteFormValues> = {
  message: '',
}
