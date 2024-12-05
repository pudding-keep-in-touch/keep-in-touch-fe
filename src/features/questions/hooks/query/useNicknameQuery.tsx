import { baseQuery } from '@/shared/api/baseQuery'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type getNicknameType = {
  userId: string
  nickname: string
}

// API 요청 함수
const fetchNicknameByUserId = async (
  userId: string
): Promise<getNicknameType | null> => {
  if (!userId) {
    throw new Error('userId is required')
  }

  //todo api 재확인 필요(토큰)
  const response = await axios.get(`/v2/users/${userId}/nickname`)
  return response.data.data.nickname // 닉네임 반환
}

// export const useGetNickname = (userId: string) => {
//   return useQuery<getNicknameType | null>({
//     queryKey: ['nickname', userId], // 쿼리 키
//     queryFn: () => fetchNicknameByUserId(userId), // 데이터 fetch 함수
//     enabled: !!userId, // userId가 존재할 때만 쿼리 실행
//   })
// }
// export const useGetNickname = (userId: string) => {
//   return useQuery<getNicknameType | null>({
//     queryKey: ['nickname', userId], // 쿼리 키
//     queryFn: async () => {
//       const { data } = await baseQuery.get(`/v2/users/${userId}/nickname`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
//         },
//       })

//       return data
//     },
//   })
// }

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

// export const useGetQuestionList = ({ userId }: useGetQuestionListProps) => {
//   return useQuery<QuestionData[], Error>({
//     queryKey: ['questionList', userId],
//     queryFn: async () => {
//       const { data } = await baseQuery.get(`/v2/users/${userId}/questions`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
//         },
//       })

//       return data
//     },
//   })
