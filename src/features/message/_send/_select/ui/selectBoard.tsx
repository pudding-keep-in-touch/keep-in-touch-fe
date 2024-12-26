'use client'

import { useRouter } from 'next/navigation'
// import { getLoginUrl } from '@/shared/config/env'
import MessageSendStep from '@/features/message/_send/ui/step'
import MessageSendSelect from '@/features/message/_send/_select/ui/select'
import MessageSendNextButton from '@/features/message/_send/_select/ui/nextButton'

export default function SelectBoard({ userId }: { userId: string }) {
  // const accessToken = localStorage.getItem('keep_in_touch_token')
  const router = useRouter()

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const token =
  //       typeof window !== 'undefined'
  //         ? localStorage.getItem('keep_in_touch_token')
  //         : null

  //     if (!token) {
  //       // 로그인되어 있지 않은 경우
  //       const currentUrl = encodeURIComponent(
  //         `${window.location.origin}/${userId}/select`
  //       )

  //       const loginUrl = getLoginUrl(currentUrl)
  //       window.location.href = loginUrl
  //     }
  //   }

  //   checkLoginStatus()
  // }, [router])

  return (
    <div className='flex-grow w-full h-screen pt-[30px] h-815:pb-[250px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
      <div className='grid flex items-center justify-center'>
        <div className='mb-5 ml-10'>
          <MessageSendStep active={1} />
        </div>
        <p className='font-medium text-lg mb-10'>쪽지 타입을 선택해 주세요!</p>
      </div>
      <MessageSendSelect />

      <MessageSendNextButton userId={userId} />
    </div>
  )
}
