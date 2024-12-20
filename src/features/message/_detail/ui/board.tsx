'use client'

import { MessageType } from '@/shared/types/common.types'
import Image from 'next/image'
import { useGetDetailMessage } from '../api/detailQuery'

export default function MessageBoard({
  directMessageId,
  messageType,
}: {
  directMessageId: number
  messageType: MessageType
}) {
  const { data } = useGetDetailMessage({ directMessageId })

  return (
    <>
      <div className='mt-[160px] py-5 px-6 min-h-[380px] w-full h-full bg-white bg-opacity-50 backdrop-blur rounded-2xl '>
        <p className='text-[#1F1F1F] font-bold text-lg mb-4'>
          {messageType === 'received'
            ? '익명에게 쪽지가 도착했습니다!'
            : `To. ${data?.receiverId}에게`}
        </p>
        <div className='w-full overflow-y-auto max-h-96 text-lg text-[#191F28] leading-relaxed'>
          {data?.content}
        </div>
      </div>

      <div className='mt-auto w-full h-[50px] flex items-center justify-center'>
        <Image
          src='/receiveDetailTitle.svg'
          alt='receive detail title'
          width={200}
          height={200}
        />
      </div>
    </>
  )
}
