'use client'

import HomeLayout from '@/shared/ui/layouts/HomeLayout'
import UserInfo from './_components/userInfo'
import MessagePreview from './_components/messagePreview'
import LinkShareButton from './_components/linkShareButton'
import Tooltip from './_components/tooltip'
import useCurrentMessage from './_hooks/useCurrentMessage'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  let userId: number | null = null

  const userIdFromParams = searchParams.get('userId')

  if (!userIdFromParams) {
    userId = Number(localStorage.getItem('keep_in_touch_user_id'))
  } else {
    userId = Number(userIdFromParams)
  }

  const { home, isLoading } = useCurrentMessage(userId)

  useEffect(() => {
    if (!home?.data) {
      const timer = setTimeout(() => {
        router.push('/login')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [home])

  if (isLoading) return null

  if (!home?.data) {
    return (
      <HomeLayout>
        <div className='flex justify-center items-center pt-[20px] px-6 w-full h-full text-center text-[#333D4B] text-2xl font-bold leading-[150%]'>
          <p>
            잘못된 경로로 접근했어요! <br /> 잠시 후 로그인 페이지로 이동합니다.
          </p>
        </div>
      </HomeLayout>
    )
  }

  if (!home.data.isOwner) {
    redirect(`/message/send/${userId}/select`)
  }

  return (
    <HomeLayout>
      <div className='mt-[30px] flex flex-col w-[100%]'>
        <UserInfo nickname={home.data.loginUser.nickname} />

        <div className='mt-[100px] flex flex-col gap-6'>
          <MessagePreview
            title='보낸 쪽지'
            type='sent'
            dmList={home.data.sentDmList[0]}
            userId={userId}
          />

          <MessagePreview
            title='받은 쪽지'
            type='received'
            dmList={home.data.receivedDmList[0]}
            userId={userId}
          />
        </div>

        <Tooltip>
          <LinkShareButton userId={userId} />
        </Tooltip>
      </div>
    </HomeLayout>
  )
}
