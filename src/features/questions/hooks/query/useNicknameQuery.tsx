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

  const response = await axios.get(`/v2/users/${userId}/nickname`)
  return response.data.data.nickname // 닉네임 반환
}

export const useGetNickname = (userId: string) => {
  return useQuery<getNicknameType | null>({
    queryKey: ['nickname', userId], // 쿼리 키
    queryFn: () => fetchNicknameByUserId(userId), // 데이터 fetch 함수
    enabled: !!userId, // userId가 존재할 때만 쿼리 실행
  })
}
