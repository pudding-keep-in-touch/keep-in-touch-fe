import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { DmList } from '../model/types'
import { baseQuery } from '@/shared/api/baseQuery'

interface MessageApiResponse {
  messages: DmList[]
  nextPage: number | null
}

interface GetMessageQueryProps {
  userId: number
  page: number
  limit: number
}

export const useGetInfiniteMessages = ({
  userId,
  page,
  limit,
}: GetMessageQueryProps) => {
  return useInfiniteQuery({
    queryKey: ['getMessages', userId],
    queryFn: async ({ pageParam }) => {
      const { data } = await baseQuery.get(
        `/v1/users/${userId}/direct-messages`,
        {
          params: {
            type: 'received',
            page: pageParam,
            limit: 10,
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
