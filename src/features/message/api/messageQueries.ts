import { useInfiniteQuery } from '@tanstack/react-query'
import { baseQuery } from '@/shared/api/baseQuery'
import { MessageType } from '@/shared/types/common.types'
import { getCookie } from '@/shared/utils/cookieUtils'
import { isTokenExpired } from '@/shared/utils/tokenUtils'

interface GetMessageQueryProps {
  userId: string
  limit: string
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
      const accessToken = getCookie('keep_in_touch_token')

      if (!accessToken || isTokenExpired(accessToken)) {
        throw new Error('Invalid or expired token. Please log in again.')
      }

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
            Authorization: `Bearer ${accessToken}`,
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
