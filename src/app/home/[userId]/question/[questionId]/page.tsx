import QuestionDetail from '@/features/home/questionDetail'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { userId: string; questionId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    return {
      title: `너에게 닿기를`,
      description: '질문이 도착했어요! 퐁~ 마음을 전해보세요!',
      openGraph: {
        title: `너에게 닿기를`,
        description: '질문이 도착했어요! 퐁~ 마음을 전해보세요!',
        url: `https://dev-fe-v2.keep-in-touch.me/home/${params.userId}/question/${params.questionId}`,
      },
    }
  } catch (e) {
    notFound()

    return {}
  }
}

export default function QuestionDetailPage({
  params: { questionId, userId },
}: {
  params: { questionId: string; userId: string }
}) {
  return <QuestionDetail questionId={questionId} userId={userId} />
}
