import { questionsType, questionType } from '@/entities/questions/questionType'

export const questions: questionsType = [
  {
    questionId: 1,
    userId: 1,
    content: '솔직한 마음을 말해줘',
    createdAt: '2024-09-15T10:30:00Z',
  },
  {
    questionId: 2,
    userId: 1,
    content: '솔직한 마음을 말해줘2',
    createdAt: '2024-09-15T10:30:00Z',
  },
  {
    questionId: 3,
    userId: 1,
    content: '솔직한 마음을 말해줘3',
    createdAt: '2024-09-15T10:30:00Z',
  },
]

export const question: questionType = {
  questionId: 1,
  userId: 1,
  content: '솔직한 마음을 말해줘',
  isHidden: false,
  createdAt: '2024-09-15T10:30:00Z',
}
