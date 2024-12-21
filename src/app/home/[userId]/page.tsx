'use client'

import Home from '@/features/home/home'
import { getCookie } from '@/shared/utils/cookieUtils'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HomePage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const router = useRouter()
  const [isChecked, setIsChecked] = React.useState(false)

  React.useEffect(() => {
    if (isChecked) return

    const accessToken = getCookie('keep_in_touch_token')
    const cookiesUserId = getCookie('keep_in_touch_user_id')

    if (!accessToken || cookiesUserId?.toString() !== userId) {
      router.replace('/')
    } else {
      setIsChecked(true)
    }
  }, [userId, router, isChecked])

  return <Home userId={userId} />
}
