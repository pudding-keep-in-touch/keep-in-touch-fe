import { useQuery } from '@tanstack/react-query'
import { getHome } from '@/shared/lib/api'
import { HomeData } from '@/shared/types'

export default function useCurrentMessage(userId: number | null) {
  const {
    data: home,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['home', userId],
    queryFn: () => getHome(userId),
  })

  return home
}
