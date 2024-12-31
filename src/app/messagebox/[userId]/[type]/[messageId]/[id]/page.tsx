'use client'
import { MessageType } from '@/shared/types/common.types'
import ReactionPage from '@/features/messagebox/ui/components/ReactionPage'
import { ChevronLeftIcon } from 'lucide-react'
import { useEffect } from 'react'
import toast, { Toaster, useToasterStore } from 'react-hot-toast'
import { useBackHandler } from '@/features/messagebox/hooks/useBackHandler'

export default function Page({
  params: { userId, type, messageId },
}: {
  params: { userId: string; type: MessageType; messageId: string }
}) {
  const backHandler = useBackHandler({ userId, type: 'received', messageId })
  const { toasts } = useToasterStore()
  const toastLimit = 1

  useEffect(() => {
    const visibleToasts = toasts.filter((t) => t.visible)
    if (visibleToasts.length > toastLimit) {
      visibleToasts.slice(toastLimit).forEach((t) => toast.dismiss(t.id))
    }
  }, [toasts])

  return (
    <div className='relative w-full h-screen-safe z-0 bg-light-background pb-safe-bottom bg-[#FFFFFF]'>
      <div className='max-w-[390px] w-full px-6'>
        <header className='w-full h-[50px] grid grid-cols-3 items-center z-50'>
          <ChevronLeftIcon
            className='w-6 h-6 cursor-pointer'
            onClick={backHandler}
          />
          <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
            반응 보내기
          </h1>
        </header>
      </div>
      <ReactionPage userId={userId} messageId={messageId} />
      <Toaster
        position='bottom-center'
        containerStyle={{
          bottom: '100px',
        }}
        toastOptions={{
          style: {
            borderRadius: '16px',
            backgroundColor: '#474747',
            width: '100%',
            height: '56px',
          },
        }}
      />
    </div>
  )
}
