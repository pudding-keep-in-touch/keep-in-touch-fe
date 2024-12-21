import React from 'react'

import { QuestionsCard } from '@/features/home/ui/questionsCard'
import { TypeQuestionCard } from '@/features/home/ui/typeQuestionCard'
import { QuestionData } from '../model/home.types'

interface QuestionsListProps {
  questionData: QuestionData[]
  isHome: boolean
  userId: string
}

export const QuestionsList = React.forwardRef<
  HTMLDivElement,
  QuestionsListProps
>(({ questionData, isHome, userId }, ref) => {
  return (
    <div ref={ref} className='px-[24px]'>
      {/* 자유 질문 */}
      <TypeQuestionCard isHome={true} />

      {questionData.length > 1 &&
        questionData.map((item) => (
          <QuestionsCard
            userId={userId}
            key={item.questionId}
            questionId={item.questionId}
            isHidden={item.isHidden}
            description={item.content}
            createdAt={item.createdAt}
            isHome={isHome}
            title='질문'
          />
        ))}
    </div>
  )
})

QuestionsList.displayName = 'QuestionsList'
