'use client'

import { useGetNickname } from '@/features/questions/hooks/query/useNicknameQuery'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'

export default function PreviewStepPage() {
  const queryClient = useQueryClient()

  const selectedQuestion = queryClient.getQueryData<{
    questionId: string
    content: string
    userId: string
  }>(['selectedQuestion'])

  const userId = selectedQuestion?.userId

  const { data: nickname } = useGetNickname(userId ?? '')

  return (
    <div className='relative w-full mb-[50px]'>
      <Image
        src={'/preview_xmas.svg'}
        alt={'preview_xmas'}
        width={500}
        height={500}
        className='w-full h-auto rounded-[30px]'
      />
      <div className='absolute top-[30px] w-full flex flex-col items-center gap-6'>
        <span className='px-2.5 py-2 font-medium text-[17px] bg-white/50 rounded-full'>
          {`To. ${nickname} 에게`}
        </span>

        <span className='whitespace-pre-wrap font-bold text-2xl text-center'>
          {`내 마음이\n너에게 닿기를`}
        </span>
      </div>
    </div>
  )
}
