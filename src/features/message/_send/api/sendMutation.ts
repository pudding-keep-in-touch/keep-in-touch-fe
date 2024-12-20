import { baseQuery } from '@/shared/api/baseQuery'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface usePostSendMessageProps {
  receiverId: string
  emotionId: string
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

    onError: () => {
      //
    },
  })
}
