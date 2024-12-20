import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QuestionData } from '../model/home.types'
import { baseQuery } from '@/shared/api/baseQuery'

interface useGetQuestionListProps {
  userId: string
}

export const useGetQuestionList = ({ userId }: useGetQuestionListProps) => {
  return useQuery<QuestionData[], Error>({
    queryKey: ['questionList', userId],
    queryFn: async () => {
      const { data } = await baseQuery.get(`/v2/users/${userId}/questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
        },
      })

      return data
    },
  })
}

interface usePostQuestionListProps {
  content: string
  isHidden: boolean
}

export const usePostQuestionList = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['postQuestion'],
    mutationFn: async ({ content, isHidden }: usePostQuestionListProps) => {
      const { data } = await baseQuery.post(
        `/v2/questions`,
        {
          content,
          isHidden,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
          },
        }
      )

      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionList'] })
    },

    onError: (error) => {
      console.log('usePostQuestionList API 호출 에러', error)
    },
  })
}

interface usePostQuestionHiddenProps {
  questionId: string
  isHidden: boolean
}

export const usePostQuestionHidden = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['postQuestionHidden'],
    mutationFn: async ({
      questionId,
      isHidden,
    }: usePostQuestionHiddenProps) => {
      const { data } = await baseQuery.patch(
        `/v2/questions/${questionId}`, // 백틱 사용
        { isHidden }, // 요청 바디
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
          },
        }
      )

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionList'] })
      console.log('Toggle mutation successful')
    },
    onError: (error) => {
      console.error('Toggle mutation failed:', error)
    },
  })
}
