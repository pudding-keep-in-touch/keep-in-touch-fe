import { useEffect, useState } from 'react'
import { getHome } from '@/shared/lib/api'
import { HomeData } from '@/shared/types'

export default function useCurrentMessage(userId: number) {
  const [home, setHome] = useState<HomeData | null>(null)

  useEffect(() => {
    getHome(userId).then((res) => {
      const { isOwner, loggedInUser, DmList, friendUser, emotions } = res?.data

      setHome({
        isOwner,
        loginUser: loggedInUser,
        dmList: DmList[0],
        friendUser,
        emotions,
      })
    })
  }, [userId])

  return home
}
