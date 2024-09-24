'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { ChevronLeftIcon } from 'lucide-react'
import { DmList } from '@/shared/types'
import { useEffect, useState } from 'react'

const mockData: DmList[] = [
  {
    id: 1,
    senderId: 10,
    content: '안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
    emotion: {
      name: '응원과감사',
      emoji: '/supportEmotion.svg',
    },
    isRead: true,
    createdAt: '2024-09-02',
  },
  {
    id: 2,
    senderId: 32,
    content:
      '두번째 안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
    emotion: {
      name: '솔직한대화',
      emoji: '/honestEmotion.svg',
    },
    isRead: true,
    createdAt: '2024-09-02',
  },

  {
    id: 3,
    senderId: 323,
    content:
      '세번째 안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
    emotion: {
      name: '솔직한대화',
      emoji: '/honestEmotion.svg',
    },
    isRead: false,
    createdAt: '2024-09-02',
  },
]

export default function MessageList({ userId }: { userId: number }) {
  const [receivedMessage, setReceivedMessage] = useState<DmList[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `http://dev-be.keep-in-touch.me:3000/v1/users/${userId}/home`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()
        setReceivedMessage(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userId])

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error}</div>

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
        {mockData.map((message) => (
          <MessageItem key={message.id} {...message} />
        ))}
      </div>
    </>
  )
}

function MessageItem({
  id,
  senderId,
  content,
  emotion,
  isRead,
  createdAt,
}: DmList) {
  const pathname = usePathname()
  const router = useRouter()

  const onClick = () => {
    router.replace(`${pathname}/detail=${id}`)
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'px-5 py-4 rounded-2xl mb-2 cursor-pointer bg-white',
        !isRead && 'outline outline-2 outline-[#35B6FF]'
      )}
    >
      <div className='flex gap-5'>
        <div className='flex flex-col w-[54px] h-[54px] shrink-0 gap-1'>
          <Image
            className='bg-zinc-300 rounded-lg w-[54px] h-[54px] shrink-0'
            src={emotion.emoji}
            alt={emotion.name}
            width={54}
            height={54}
          />
          <div
            className={cn(
              'flex justify-center items-center py-[5px] w-full rounded-sm',
              emotion.name === '응원과감사' ? 'bg-[#D7F1FF]' : 'bg-[#FFDDFE]'
            )}
          >
            <span className='text-[10px] text-[#1F1F1F] font-medium'>
              {emotion.name}
            </span>
          </div>
        </div>
        <div>
          <div className='font-semibold text-[#333D4B] text-[17px]'>
            {senderId}
          </div>
          <div className='text-[#333D4B] mt-1 line-clamp-1 text-base'>
            {content}
          </div>
          <div className='text-xs text-[#6B7684] mt-2 text-[13px]'>
            {createdAt}
          </div>
        </div>
      </div>
    </div>
  )
}
