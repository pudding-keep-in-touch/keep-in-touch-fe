import { useQuery } from '@tanstack/react-query'
import { randomDescriptions } from '@/entities/questions/questionData'

// 랜덤 문구를 반환하는 함수
const fetchRandomDescription = async (): Promise<string> => {
  const randomIndex = Math.floor(Math.random() * randomDescriptions.length)
  return new Promise(
    (resolve) => setTimeout(() => resolve(randomDescriptions[randomIndex]), 500) // 비동기 처리 시뮬레이션
  )
}

// Query 훅 정의
export const useRandomDescriptionQuery = () => {
  return useQuery({
    queryKey: ['randomDescription'], // 쿼리 키
    queryFn: fetchRandomDescription, // 쿼리 함수
    // staleTime: 1000 * 60, // 캐시 유효 시간 (1분)
    // cacheTime: 1000 * 60 * 5, // 캐시 보관 시간 (5분)
    refetchOnWindowFocus: false, // 포커스 이동 시 refetch 안 함
  })
}
