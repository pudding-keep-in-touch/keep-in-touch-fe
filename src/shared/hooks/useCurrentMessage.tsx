import { useQuery } from '@tanstack/react-query'
import { getHome } from '@/features/home/api/api'

export default function useCurrentMessage(userId: number | null) {
  const {
    data: home,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['home', userId],
    queryFn: () => getHome(userId),
  })

  return { home, isLoading }
}
