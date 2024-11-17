'use client'

import Image from 'next/image'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/shared/utils/emotionVariety'
import {
  getVarietyData,
  messageVarieties,
  MessageVariety,
} from '@/entities/message/utils/messageVarieties'

export default function MessageSendSelect() {
  return (
    <div className='w-full flex flex-col gap-5'>
      {messageVarieties.map((v) => (
        <SelectButton variety={v} key={v} />
      ))}
    </div>
  )
}

function SelectButton({ variety }: { variety: MessageVariety }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const data = getVarietyData(variety)

  const onClick = () => {
    router.replace(`${pathname}/?variety=${variety}`)
  }

  return (
    <div
      role='button'
      onClick={onClick}
      className={cn(
        'rounded-2xl w-full relative overflow-hidden',
        searchParams.get('variety') === variety &&
          'outline outline-2 outline-black'
      )}
    >
      <Image
        src={data.src}
        alt={data.text}
        width={350}
        height={250}
        className='w-full h-auto'
      />
      <p className='absolute top-[10%] left-[10%] text-[#191F28] font-bold text-[26px]'>
        {data.text}
      </p>
    </div>
  )
}
