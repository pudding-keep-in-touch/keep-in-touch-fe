import { useEffect, useState } from 'react'
import { getHome } from '@/shared/lib/api'

export default function useCurrentMessage(userId: number) {
  const [home, setHome] = useState(null)

  useEffect(() => {
    getHome(userId).then(setHome)
  }, [userId])

  return home
}
