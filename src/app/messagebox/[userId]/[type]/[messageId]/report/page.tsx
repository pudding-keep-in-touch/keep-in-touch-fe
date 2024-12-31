'use client'
import { usePatchMessageStatus } from '@/features/messagebox/_detail/api/detailQuery'
import { Button } from '@/shared/components/Button'
import { openInNewTab } from '@/shared/hooks/util/openTabUtil'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

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
    const redirectURL = `/messagebox/${userId}/received/${messageId}`
    const openURL = `https://docs.google.com/forms/d/e/1FAIpQLSeZPcMHDIXxFnzu5KPc8Iz3f7kivNexgR0kDTghnWIPJuuRZQ/viewform`
    try {
      const response = await mutateAsync({
        messageId,
        status: 'reported',
      })
      openInNewTab(openURL)
      router.push(redirectURL)
      if (!response) {
        console.error('Reported response is empty: ', response)
        router.back()
      }
    } catch (error) {
      console.error('Failed to change status from normal to reported: ', error)
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
          <h1 className='text-[#191F28] text-[22px] leading-[28px] font-bold'>
            신고하기
          </h1>
          <p className='font-semibold text-[15px] text-[#6B7684]'>
            해당 내용에 대한 신고하기 요청으로 넘어갑니다.
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
              신고하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
