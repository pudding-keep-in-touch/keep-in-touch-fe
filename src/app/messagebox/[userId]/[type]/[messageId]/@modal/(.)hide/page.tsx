'use client'
import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const onDismiss = useCallback(() => {
    router.back()
  }, [router])
  return (
    <div
      onClick={() => {
        onDismiss()
      }}
      className='absolute inset-0 h-full w-full flex items-center justify-center bg-black bg-opacity-50'
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className='flex flex-col'
      >
        <div className='bg-white w-full h-[193px] rounded-2xl py-[22px] px-[17px] flex flex-col justify-between items-center'>
          <h1 className='text-[#191F28] text-[22px] font-bold'>숨기기</h1>
          <p className='font-semibold text-[15px] text-[#6B7684]'>
            해당 답변 내용을 숨김 처리하시겠습니까?
          </p>
          <div className='flex justify-center items-center w-full h-[55px] gap-[9px]'>
            <Button
              onClick={() => router.back()}
              className='bg-gray-1 text-[#505967] text-[17px] rounded-2xl w-full h-full p-4 font-bold'
            >
              취소
            </Button>
            <Button
              onClick={() => router.back()}
              className='rounded-2xl w-full h-full p-4 text-[17px] bg-[#35B6FF] text-white font-bold'
            >
              숨기기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
