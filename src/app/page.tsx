'use client'
import Image from 'next/image'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import { useRouter } from 'next/navigation'
import React from 'react'
import splashJson from '@/features/main/lottie/splash.json'
import Lottie from 'lottie-react'

export default function Main() {
  const router = useRouter()

  // TODO : 로그인 붙이고 처리 예정
  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token =
  //       typeof window !== 'undefined'
  //         ? localStorage.getItem('keep_in_touch_token')
  //         : null
  //     const userId =
  //       typeof window !== 'undefined'
  //         ? localStorage.getItem('keep_in_touch_user_id')
  //         : null

  //     if (!token) {
  //       setTimeout(() => {
  //         router.push('/login')
  //       }, 2000)
  //       return
  //     }
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/home`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       if (!response.ok) {
  //         setTimeout(() => router.push('/login'), 2000)
  //       } else {
  //         setTimeout(() => router.push('/home'), 2000)
  //       }
  //     } catch (error) {
  //       console.error(error)
  //       setTimeout(() => router.push('/login'), 2000)
  //     }
  //   }
  //   checkToken()
  // }, [router])

  React.useEffect(() => {
    setTimeout(() => router.push('/login'), 2000)
  })

  return (
    <MainLayout>
      <Lottie className='lottie-player' animationData={splashJson} loop={0} />
    </MainLayout>
  )
}
