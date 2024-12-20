'use client'

import Home from '@/features/home/home'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useCookies } from 'react-cookie'

export default function HomePage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const router = useRouter()
  const [cookies] = useCookies(['keep_in_touch_token', 'keep_in_touch_user_id'])
  const [isChecked, setIsChecked] = React.useState(false)

  React.useEffect(() => {
    if (isChecked) return

    const cookiesToken = cookies.keep_in_touch_token
    const cookiesUserId = cookies.keep_in_touch_user_id

    if (!cookiesToken || cookiesUserId !== userId) {
      router.replace('/')
    } else {
      setIsChecked(true)
    }
  }, [
    cookies.keep_in_touch_token,
    cookies.keep_in_touch_user_id,
    userId,
    router,
    isChecked,
  ])

  return <Home userId={userId} />
}
