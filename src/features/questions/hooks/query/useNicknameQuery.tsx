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
  return useQuery<getNicknameType | null>({
    queryKey: ['nickname', userId],
    queryFn: async () => {
      if (!userId) return null

      // 인터셉터에 의해 Authorization 헤더가 추가됨
      const { data } = await baseQuery.get(`/v2/users/${userId}/nickname`)
      return data?.nickname || null
    },

    enabled: !!userId,
    initialData: null,
  })
}
