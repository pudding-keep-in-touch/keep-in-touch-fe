import { baseQuery } from '@/shared/api/baseQuery'
import { getCookie } from '@/shared/utils/cookieUtils'
import { isTokenExpired } from '@/shared/utils/tokenUtils'
import { useQuery } from '@tanstack/react-query'

interface useGetDetailMessageProps {
  directMessageId: number
}

export const useGetDetailMessage = ({
  directMessageId,
}: useGetDetailMessageProps) => {
  const accessToken = getCookie('keep_in_touch_token')

  if (!accessToken || isTokenExpired(accessToken)) {
    throw new Error('questionList No access token available')
  }

  return useQuery({
    queryKey: ['getDetailMessage', directMessageId],
    queryFn: async () => {
      const { data } = await baseQuery.get(
        `/v1/direct-messages/${directMessageId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 쿠키에서 토큰 읽어오기
          },
        }
      )

      return data
    },
  })
}
