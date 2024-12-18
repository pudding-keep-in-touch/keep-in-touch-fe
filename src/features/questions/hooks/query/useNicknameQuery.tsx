import { baseQuery } from '@/shared/api/baseQuery'
import { useQuery } from '@tanstack/react-query'

type getNicknameType = {
  userId: string
  nickname: string
}

/**
 * 특정 사용자의 닉네임 가져오기
 * @param {string | undefined} userId - 닉네임을 가져올 사용자의 userId
 * @returns {object}
 */

export const useGetNickname = (userId: string | undefined) => {
  const token = localStorage.getItem('keep_in_touch_token')

  return useQuery<getNicknameType | null>({
    queryKey: ['nickname', userId],
    queryFn: async () => {
      if (!userId) return null
      const { data } = await baseQuery.get(`/v2/users/${userId}/nickname`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data?.nickname || null
    },
    enabled: !!userId && !!token,
    initialData: null,
  })
}
