export type questionsType = {
  questionId: number
  userId: number
  content: string
  createdAt: string
}[]

export type questionType = {
  questionId: number
  userId: number
  content: string
  isHidden: false
  createdAt: string
}
