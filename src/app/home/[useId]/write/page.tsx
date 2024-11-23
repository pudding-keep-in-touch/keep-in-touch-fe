import { WriteQuestion } from '@/features/home/writeQuestion'

export default function WriteQuestionPage({
  params: { userId },
}: {
  params: { userId: number }
}) {
  return <WriteQuestion userId={userId} />
}
