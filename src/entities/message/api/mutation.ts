import { baseQuery } from '@/shared/api/baseQuery'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

interface usePostSendMessageProps {
  receiverId: number
  emotionId: number
  content: string
}

export const usePostSendMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['postSendMessage'],
    mutationFn: async ({
      receiverId,
      emotionId,
      content,
    }: usePostSendMessageProps) => {
      const { data } = await baseQuery.post('/v1/direct-messages', {
        receiverId,
        emotionId,
        content,
      })
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home'] })
    },
  })
}
