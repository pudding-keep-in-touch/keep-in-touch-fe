import { questionsType, questionType } from '@/entities/questions/questionType'

export const questions: questionsType = [
  {
    questionId: '1',
    userId: '1',
    content: '솔직한 마음을 말해줘',
    createdAt: '2024-09-15T10:30:00Z',
  },
  {
    questionId: '2',
    userId: '1',
    content: '솔직한 마음을 말해줘2',
    createdAt: '2024-09-15T10:30:00Z',
  },
  {
    questionId: '3',
    userId: '1',
    content: '솔직한 마음을 말해줘3',
    createdAt: '2024-09-15T10:30:00Z',
  },
]

export const question: questionType = {
  questionId: '1',
  userId: '1',
  content: '솔직한 마음을 말해줘',
  isHidden: false,
  createdAt: '2024-09-15T10:30:00Z',
}

// 랜덤 문구 목록
export const randomDescriptions = [
  '자유롭게 마음을 표현해보세요! \n지금 시작해볼까요? 😊',
  '친구들이 뭐라고 답할지 궁금하지 않나요? 🧐 \n지금 바로 퐁! 💌',
  '퐁~ 하고 던져보세요, \n친구들이 답장해줄 거예요! 😉',
  '친구들이 당신에게 퐁~ 하고 \n마음을 보낼 준비가 되었답니다! 💕',
]
