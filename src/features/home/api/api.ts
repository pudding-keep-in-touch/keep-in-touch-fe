import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QuestionData } from '../model/home.types'
import { baseQuery } from '@/shared/api/baseQuery'
import { getCookie } from '@/shared/utils/cookieUtils'
import { isTokenExpired } from '@/shared/utils/tokenUtils'

interface useGetQuestionListProps {
  userId: string
}

export const useGetQuestionList = ({ userId }: useGetQuestionListProps) => {
  const accessToken = getCookie('keep_in_touch_token')

  if (!accessToken || isTokenExpired(accessToken)) {
    throw new Error('questionList No access token available')
  }

  return useQuery<QuestionData[], Error>({
    queryKey: ['questionList', userId],
    queryFn: async () => {
      const { data } = await baseQuery.get(`/v2/users/${userId}/questions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return data
    },

    enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
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
      const accessToken = getCookie('keep_in_touch_token')

      if (!accessToken || isTokenExpired(accessToken)) {
        throw new Error('Invalid or expired token. Please log in again.')
      }

      const { data } = await baseQuery.post(
        `/v2/questions`,
        {
          content,
          isHidden,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
      const accessToken = getCookie('keep_in_touch_token')

      if (!accessToken || isTokenExpired(accessToken)) {
        throw new Error('Invalid or expired token. Please log in again.')
      }

      const { data } = await baseQuery.patch(
        `/v2/questions/${questionId}`,
        { isHidden },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
