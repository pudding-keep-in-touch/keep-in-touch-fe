import QuestionDetail from '@/features/home/questionDetail'

export default function QuestionDetailPage({
  params: { questionId, userId },
}: {
  params: { questionId: string; userId: number }
}) {
  return <QuestionDetail questionId={questionId} userId={userId} />
}
