import {
  QuestionPostType,
  QuestionsType,
  QuestionType,
} from '@/entities/questions/questionType'
import { baseQuery, publicQuery } from '@/shared/api/baseQuery'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

/**
 * 질문 목록 가져오기
 * @param {string} userId - 질문자의 userId
 * @returns {object}
 */
export const useGetQuestionList = (userId: string) => {
  return useQuery<QuestionsType, Error>({
    queryKey: ['questionList', userId],
    queryFn: async () => {
      const { data } = await publicQuery.get(`/v2/questions?userId=${userId}`)
      return data
    },
    enabled: !!userId,
  })
}

/**
 * 특정 질문 가져오기
 * @param {string} questionId - 질문의 questionId
 * @returns {object}
 */
export const useGetQuestion = (questionId: string) => {
  return useQuery<QuestionType, Error>({
    queryKey: ['question', questionId],
    queryFn: async () => {
      const { data } = await publicQuery.get(`/v2/questions/${questionId}`)

      return data
    },
    enabled: !!questionId,
  })
}

/**
 * 메시지 전송
 * @returns {object}
 */
export const usePostMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['postMessage'],
    mutationFn: async ({
      receiverId,
      content,
      questionId,
      emotionId,
    }: QuestionPostType) => {
      const token = localStorage.getItem('keep_in_touch_token')

      if (!token) {
        throw new Error('Authorization token is missing')
      }

      const { data } = await baseQuery.post(
        '/v2/messages',
        {
          receiverId,
          content,
          questionId,
          emotionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] }) // 캐시 무효화
    },
    onError: (error) => {
      console.error('메시지 전송 실패:', error)
    },
  })
}
