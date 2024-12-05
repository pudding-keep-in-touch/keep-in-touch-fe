import { baseQuery } from '@/shared/api/baseQuery'
import { useQuery } from '@tanstack/react-query'

type getNicknameType = {
  userId: string
  nickname: string
}

export const useGetNickname = (userId: string) => {
  const token = localStorage.getItem('keep_in_touch_token')

  return useQuery<getNicknameType | null>({
    queryKey: ['nickname', userId],
    queryFn: async () => {
      const { data } = await baseQuery.get(`/v2/users/${userId}/nickname`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // 응답에서 nickname만 추출하여 반환
      console.log('data', data)
      return data?.nickname || null // nickname 값만 반환
    },
    enabled: !!userId && !!token,
  })
}
