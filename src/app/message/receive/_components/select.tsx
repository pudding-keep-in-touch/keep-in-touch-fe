'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { ChevronLeftIcon } from 'lucide-react'

interface MessageType {
  id: string
  src: string
  sender: string
  content: string
  timestamp: string
}

interface MessageItemProps extends MessageType {
  isSelected: boolean
}

const messages: MessageType[] = [
  {
    id: '1',
    src: '',
    sender: '홍길동님께',
    content: '내용내용내용내용내용내용내용내용...',
    timestamp: '2024.08.31 오후11:57',
  },
  {
    id: '2',
    src: '',
    sender: '홍길동님께',
    content: '내용내용내용내용내용내용내용내용...',
    timestamp: '2024.08.31 오후11:57',
  },
  {
    id: '3',
    src: '',
    sender: '홍길동님께',
    content:
      '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    timestamp: '2024.08.31 오후11:57',
  },
]

export default function MessageList() {
  const searchParams = useSearchParams()
  const selectedId = searchParams.get('detail')
  const router = useRouter()

  return (
    <>
      <header className='w-full h-[50px] grid grid-cols-3 items-center px-6'>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={() => router.back()}
        />
        <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
          받은 쪽지
        </h1>
      </header>
      <div className='w-full flex flex-col gap-2 py-10 px-6'>
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            {...message}
            isSelected={message.id === selectedId}
          />
        ))}
      </div>
    </>
  )
}

function MessageItem({
  id,
  src,
  sender,
  content,
  timestamp,
  isSelected,
}: MessageItemProps) {
  const pathname = usePathname()
  const router = useRouter()

  const onClick = () => {
    router.replace(`${pathname}/detail=${id}`)
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'px-5 py-4 rounded-lg mb-2 cursor-pointer bg-white',
        isSelected && 'outline outline-2 outline-blue-300'
      )}
    >
      <div className='flex gap-5'>
        <Image
          className='bg-zinc-300 rounded-lg w-[54px] h-[54px] shrink-0'
          src={src}
          alt={content}
          width={54}
          height={54}
        />
        <div>
          <div className='font-semibold text-[#333D4B] text-[17px]'>
            {sender}
          </div>
          <div className='text-[#333D4B] mt-1 line-clamp-1 text-base'>
            {content}
          </div>
          <div className='text-xs text-[#6B7684] mt-2 text-[13px]'>
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  )
}
