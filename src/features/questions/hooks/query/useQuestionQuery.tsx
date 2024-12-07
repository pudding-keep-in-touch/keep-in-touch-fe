// todo api 파일 위치 변경

import { questionsType, questionType } from '@/entities/questions/questionType'
import { publicQuery } from '@/shared/api/baseQuery'
import { useQuery } from '@tanstack/react-query'

export const useGetQuestionList = (userId: string) => {
  return useQuery<questionsType, Error>({
    queryKey: ['questionList', userId],
    queryFn: async () => {
      const { data } = await publicQuery.get(`/v2/questions?userId=${userId}`)
      return data
    },

    enabled: !!userId,
  })
}

export const useGetQuestion = (questionId: string) => {
  return useQuery<questionType, Error>({
    queryKey: ['question', questionId],
    queryFn: async () => {
      const { data } = await publicQuery.get(`/v2/questions/${questionId}`)

      return data
    },
  })
}
