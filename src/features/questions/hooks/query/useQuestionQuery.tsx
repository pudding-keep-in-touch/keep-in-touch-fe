// todo api 파일 위치 변경

import { questionsType, questionType } from '@/entities/questions/questionType'
import { baseQuery } from '@/shared/api/baseQuery'
import { useQuery } from '@tanstack/react-query'

type QuestionListType = {
  userId: string
}

export const useGetQuestionList = ({ userId }: QuestionListType) => {
  return useQuery<questionsType[], Error>({
    queryKey: ['questionList', userId],
    queryFn: async () => {
      const { data } = await baseQuery.get(`/v2/questions?userId=${userId}`)

      return data
    },
  })
}

type QuestionType = {
  questionId: string
}
export const useGetQuestion = ({ questionId }: QuestionType) => {
  return useQuery<questionType[], Error>({
    queryKey: ['question', questionId],
    queryFn: async () => {
      const { data } = await baseQuery.get(`/v2/questions/${questionId}`)

      return data
    },
  })
}
