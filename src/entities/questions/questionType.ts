export type QuestionsType = {
  questionId: string
  userId: string
  content: string
  createdAt: string
}[]

export type QuestionType = {
  questionId: string
  userId: string
  content: string
  isHidden: boolean
  createdAt: string
}

export type QuestionPostType = {
  receiverId: string
  content: string
  questionId?: string
  emotionId?: string
}
