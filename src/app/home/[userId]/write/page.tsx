import QuestionFormProvider from '@/features/home/context/FormProvider'
import { WriteQuestion } from '@/features/home/writeQuestion'

export default function WriteQuestionPage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  return (
    <QuestionFormProvider>
      <WriteQuestion userId={userId} />
    </QuestionFormProvider>
  )
}
