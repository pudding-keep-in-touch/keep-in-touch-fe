import React from 'react'

import { QuestionsCard } from '@/features/home/ui/questionsCard'

type QuestionDataType = {
  id: number
  title: string
  description: React.ReactElement | string
}

interface QuestionsListProps {
  questionData: QuestionDataType[]
}

export const QuestionsList = ({ questionData }: QuestionsListProps) => {
  return (
    <div>
      {questionData.map((item) => (
        <QuestionsCard
          key={item.id}
          title={item.title}
          description={item.description}
          isFreeQuestion={false}
        />
      ))}
    </div>
  )
}
