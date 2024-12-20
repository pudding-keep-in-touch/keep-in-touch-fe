import { baseQuery } from '@/shared/api/baseQuery'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

interface useGetDetailMessageProps {
  directMessageId: number
}

export const useGetDetailMessage = ({
  directMessageId,
}: useGetDetailMessageProps) => {
  const [cookies] = useCookies(['keep_in_touch_token']) // 쿠키에서 토큰 읽기

  return useQuery({
    queryKey: ['getDetailMessage', directMessageId],
    queryFn: async () => {
      const { data } = await baseQuery.get(
        `/v1/direct-messages/${directMessageId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.keep_in_touch_token}`, // 쿠키에서 토큰 읽어오기
          },
        }
      )

      return data
    },
  })
}
