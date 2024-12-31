'use client'
import { usePatchMessageStatus } from '@/features/messagebox/_detail/api/detailQuery'
import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

export default function Page({
  params: { userId, messageId },
}: {
  params: { userId: string; messageId: string }
}) {
  const router = useRouter()
  const onDismiss = useCallback(() => {
    router.back()
  }, [])

  const { mutateAsync, isPending } = usePatchMessageStatus()
  const changeStatus = async () => {
    const redirectURL = `/messagebox/${userId}/received`
    try {
      console.log('For Hide Mutation payload:', { messageId })
      const response = await mutateAsync({
        messageId,
        status: 'normal',
      })
      toast('숨기기가 해제되었습니다.')
      router.push(redirectURL)
      console.log(response)
      if (!response) {
        console.error('Change to Normal Response is empty:', response)
        router.back()
      }
    } catch (error) {
      console.error('Failed to change Status from hidden to normal: ', error)
      router.back()
    }
  }
  return (
    <div
      onClick={() => {
        onDismiss()
      }}
      className='absolute z-10 inset-0 h-full w-full flex items-center justify-center bg-black bg-opacity-50'
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className='flex flex-col'
      >
        <div className='bg-white w-[321px] h-[193px] rounded-2xl py-[22px] px-[17px] flex flex-col justify-between items-center'>
          <h1 className='text-[#191F28] text-[22px] font-bold'>숨김 해제</h1>
          <p className='font-semibold text-[15px] text-[#6B7684]'>
            해당 내용을 숨김 해제 하시겠습니까?
          </p>
          <div className='flex justify-center items-center w-full h-[55px] gap-[9px]'>
            <Button
              type='button'
              variant='secondary'
              onClick={() => router.back()}
              className='bg-gray-1 text-[#505967] text-[17px] rounded-2xl w-full h-full p-4 font-bold'
            >
              취소
            </Button>
            <Button
              type='button'
              variant='ghost'
              disabled={isPending}
              onClick={changeStatus}
              className='rounded-2xl w-full h-full p-4 text-[17px] bg-[#35B6FF] text-white font-bold'
            >
              숨김 해제
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
