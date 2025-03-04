'use client'

import {
  getVarietyData,
  MessageVariety,
} from '@/entities/message/utils/messageVarieties'
import { useGetNickname } from '@/features/questions/hooks/query/useNicknameQuery'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function MessageSendPreview({ userId }: { userId: string }) {
  const params = useParams<{ variety: MessageVariety }>()
  const { preview } = getVarietyData(params.variety)

  const { data: nickname } = useGetNickname(userId ?? '')

  return (
    <div className='relative w-full mb-[50px]'>
      <Image
        src={preview.src}
        alt={preview.text}
        width={500}
        height={500}
        className='w-full h-auto rounded-[30px]'
      />
      <div className='absolute top-[30px] w-full flex flex-col items-center gap-6'>
        <span className='px-2.5 py-2 font-medium text-[17px] bg-white/50 rounded-full'>
          {`To. ${nickname} 에게`}
        </span>

        <span className='whitespace-pre-wrap font-bold text-2xl text-center'>
          {preview.text}
        </span>
      </div>
    </div>
  )
}
