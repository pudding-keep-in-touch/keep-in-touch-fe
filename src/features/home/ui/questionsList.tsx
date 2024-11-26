import React from 'react'

import { QuestionsCard } from '@/features/home/ui/questionsCard'
import { TypeQuestionCard } from '@/features/home/ui/typeQuestionCard'

type QuestionDataType = {
  id: number
  title: string
  description: React.ReactElement | string
}

interface QuestionsListProps {
  questionData?: QuestionDataType[]
  isHome: boolean
  userId: number
}

export const QuestionsList = React.forwardRef<
  HTMLDivElement,
  QuestionsListProps
>(({ questionData, isHome, userId }, ref) => {
  return (
    <div ref={ref} className='px-[24px]'>
      {/* 자유 질문 */}
      <TypeQuestionCard userId={userId} isHome={true} />

      {questionData &&
        questionData.map((item) => (
          <QuestionsCard
            userId={userId}
            key={item.id}
            questionId={item.id}
            title={item.title}
            description={item.description}
            isHome={isHome}
          />
        ))}
    </div>
  )
})

QuestionsList.displayName = 'QuestionsList'
