import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QuestionData } from '../model/home.types'
import { baseQuery } from '@/shared/api/baseQuery'
import { useCookies } from 'react-cookie'

interface useGetQuestionListProps {
  userId: string
}

export const useGetQuestionList = ({ userId }: useGetQuestionListProps) => {
  const [cookies] = useCookies(['keep_in_touch_token'])

  return useQuery<QuestionData[], Error>({
    queryKey: ['questionList', userId],
    queryFn: async () => {
      const { data } = await baseQuery.get(`/v2/users/${userId}/questions`, {
        headers: {
          Authorization: `Bearer ${cookies.keep_in_touch_token}`,
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
  const [cookies] = useCookies(['keep_in_touch_token'])
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
            Authorization: `Bearer ${cookies.keep_in_touch_token}`,
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
  const [cookies] = useCookies(['keep_in_touch_token'])
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['postQuestionHidden'],
    mutationFn: async ({
      questionId,
      isHidden,
    }: usePostQuestionHiddenProps) => {
      const { data } = await baseQuery.patch(
        `/v2/questions/${questionId}`,
        { isHidden },
        {
          headers: {
            Authorization: `Bearer ${cookies.keep_in_touch_token}`,
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
