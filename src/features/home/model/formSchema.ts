import { z } from 'zod'

export const questionFormSchema = z.object({
  question: z.string().min(1).max(200),
})

export type QuestionFormValues = z.infer<typeof questionFormSchema>

export const defaultValues: Partial<QuestionFormValues> = {
  question: '',
}
