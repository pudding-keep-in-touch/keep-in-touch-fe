'use client'

import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import ReactionPage from '@/features/messagebox/ui/ReactionPage'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
export default function Page({
  params: { userId, type, messageId },
}: {
  params: { userId: number; type: MessageType; messageId: number }
}) {
  const router = useRouter()
  // /reaction, /report, /hide 제외 나머지 페이지 예외 처리 필요
  return (
    <div className='relative w-full h-screen-safe z-0 bg-light-background pb-safe-bottom'>
      <div className='max-w-[390px] w-full min-h-[368px] px-6'>
        <Toaster position='bottom-center' reverseOrder={false} />
        <div className=' overflow-y-scroll scrollbar-hide flex justify-center w-full'>
          <header className='w-full h-[50px] grid grid-cols-3 items-center z-50'>
            <ChevronLeftIcon
              className='w-6 h-6 cursor-pointer'
              onClick={() => router.back()}
            />
            <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
              반응 보내기
            </h1>
          </header>
        </div>
        <ReactionPage
          messageType={type}
          userId={userId}
          messageId={messageId}
        />
      </div>
    </div>
  )
}
