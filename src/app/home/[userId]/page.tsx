'use client'

import { useGetUserNickname } from '@/features/home/api/api'
import Home from '@/features/home/home'
import { Metadata } from 'next'
import { notFound, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  params: { userId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id =
      typeof window !== 'undefined'
        ? localStorage.getItem('keep_in_touch_user_id')
        : null

    const isLogin = id !== null ? true : false

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useGetUserNickname({
      userId: params.userId,
      isLogin: isLogin,
    })

    return {
      title: `From. ${data?.nickname}, 너에게 닿기를`,
      description: '질문이 도착했어요! 퐁~ 마음을 전해보세요!',
      openGraph: {
        title: `From. ${data?.nickname}, 너에게 닿기를`,
        description: '질문이 도착했어요! 퐁~ 마음을 전해보세요!',
        url: `https://dev-fe-v2.keep-in-touch.me/home/${params.userId}`,
      },
    }
  } catch (e) {
    notFound()

    return {}
  }
}

export default function HomePage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const router = useRouter()

  React.useEffect(() => {
    const userId = localStorage.getItem('userId')
    const urlParts = window.location.pathname.split('/') // 브라우저의 URL 경로를 직접 사용
    const urlId = urlParts[urlParts.length - 1] // URL에서 ID 추출

    if (!userId || userId !== urlId) {
      router.replace(`/`) // 메인 페이지로 리다이렉트
    }
  }, [router])

  return <Home userId={userId} />
}
