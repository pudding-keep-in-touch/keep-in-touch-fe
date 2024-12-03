import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QuestionData } from '../model/home.types'
import { baseQuery } from '@/shared/api/baseQuery'

interface useGetQuestionListProps {
  userId: number
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

    onError: () => {
      //
    },
  })
}

// export const usePostQuestionHidden = () => {
//   return useMutation({
//     mutationKey: ['postQuestionHidden'],
//     mutationFn: async({}),
//   })
// }
