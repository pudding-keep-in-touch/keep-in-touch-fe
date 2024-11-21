import React from 'react'

import { QuestionsCard } from '@/features/home/ui/questionsCard'

type QuestionDataType = {
  id: number
  title: string
  description: React.ReactElement | string
}

interface QuestionsListProps {
  questionData: QuestionDataType[]
  isHome: boolean
  userId: number
}

export const QuestionsList = ({
  questionData,
  isHome,
  userId,
}: QuestionsListProps) => {
  return (
    <div>
      {questionData.map((item) => (
        <QuestionsCard
          userId={userId}
          key={item.id}
          questionId={item.id}
          title={item.title}
          description={item.description}
          isFreeQuestion={false}
          isHome={isHome}
        />
      ))}
    </div>
  )
}
