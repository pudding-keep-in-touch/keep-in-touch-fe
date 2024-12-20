import { baseQuery } from '@/shared/api/baseQuery'
import { useQuery } from '@tanstack/react-query'

interface useGetDetailMessageProps {
  directMessageId: number
}

export const useGetDetailMessage = ({
  directMessageId,
}: useGetDetailMessageProps) => {
  return useQuery({
    queryKey: ['getDetailMessage', directMessageId],
    queryFn: async () => {
      const { data } = await baseQuery.get(
        `/v1/direct-messages/${directMessageId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
          },
        }
      )

      return data
    },
  })
}
