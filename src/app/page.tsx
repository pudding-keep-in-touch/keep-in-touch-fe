'use client'
import Image from 'next/image'
import MainLayout from '@/shared/ui/layouts/MainLayout'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Main() {
  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('keep_in_touch_token')
      const userId = localStorage.getItem('keep_in_touch_user_id')

      if (!token) {
        setTimeout(() => {
          router.push('/home')
        }, 2000)
        return
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/home`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          setTimeout(() => router.push('/login'), 2000)
        } else {
          setTimeout(() => router.push('/home'), 2000)
        }
      } catch (error) {
        console.error(error)
        setTimeout(() => router.push('/login'), 2000)
      }
    }

    checkToken()
  }, [router])

  return (
    <MainLayout>
      <div className='relative w-[32rem]'>
        <Image
          src='/mainTitle.svg'
          alt='main title'
          width={200}
          height={200}
          className='absolute top-40 left-12'
        />
        <Image src='/main.svg' alt='main' width={600} height={800} />
      </div>
    </MainLayout>
  )
}
