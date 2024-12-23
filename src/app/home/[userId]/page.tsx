import Home from '@/features/home/home'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: { userId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    return {
      title: `너에게 닿기를`,
      description: '질문이 도착했어요! 퐁~ 마음을 전해보세요!',
      openGraph: {
        title: `너에게 닿기를`,
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
  return <Home userId={userId} />
}
