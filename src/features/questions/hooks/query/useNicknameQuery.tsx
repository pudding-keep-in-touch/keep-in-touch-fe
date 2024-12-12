import { baseQuery } from '@/shared/api/baseQuery'
import { useQuery } from '@tanstack/react-query'

type getNicknameType = {
  userId: string
  nickname: string
}

// export const useGetNickname = (userId: string) => {
//   const token = localStorage.getItem('keep_in_touch_token')

//   return useQuery<getNicknameType | null>({
//     queryKey: ['nickname', userId],
//     queryFn: async () => {
//       const { data } = await baseQuery.get(`/v2/users/${userId}/nickname`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       // 응답에서 nickname만 추출하여 반환
//       return data?.nickname || null // nickname 값만 반환
//     },
//     enabled: !!userId && !!token,
//   })
// }

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
    initialData: null, // 초기 데이터를 명시적으로 설정
  })
}
