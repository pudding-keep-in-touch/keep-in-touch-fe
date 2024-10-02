import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { baseQuery } from '@/shared/api/baseQuery'
import { MessageType } from '@/shared/types'

interface GetMessageQueryProps {
  userId: number
  limit: number
  type: MessageType
}

export const useGetInfiniteMessages = ({
  userId,
  limit,
  type,
}: GetMessageQueryProps) => {
  return useInfiniteQuery({
    queryKey: ['getMessages', userId],
    queryFn: async ({ pageParam }) => {
      const { data } = await baseQuery.get(
        `/v1/users/${userId}/direct-messages`,
        {
          params: {
            type: type,
            page: pageParam,
            limit: limit,
            order: 'desc',
          },

          headers: {
            Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
          },
        }
      )

      return data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPageParam + 1
    },
  })
}

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
