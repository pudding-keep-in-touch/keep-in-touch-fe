// todo 새로운 이미지로 변경 필요

'use client'

import {
  getVarietyData,
  MessageVariety,
} from '@/entities/message/utils/messageVarieties'
import Image from 'next/image'
import { useParams } from 'next/navigation'

// export default function MessageSendPreview({ userId }: { userId: number }) {
export default function PreviewStepPage({ nickname }: { nickname: string }) {
  //   const params = useParams<{ variety: MessageVariety }>()
  //   const { preview } = getVarietyData(params.variety)

  // todo getVarietyData 추가?

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
