import { useInfiniteQuery } from '@tanstack/react-query'
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
    queryFn: ({ pageParam }) =>
      baseQuery.get(`/v1/users/${userId}/direct-messages`, {
        params: {
          type: 'received',
          page: pageParam,
          limit: 10,
          order: 'desc',
        },

        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPageParam + 1
    },
  })
}
