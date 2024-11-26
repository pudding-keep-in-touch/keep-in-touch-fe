'use client'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import Link from 'next/link'
import Image from 'next/image'
import { Message } from '@/features/messagebox/model/messagebox.types'
import { useGetMessageList } from '../_detail/api/detailQuery'
import { useState } from 'react'

export default function MessageList({
  userId,
  messageType,
}: {
  userId: number
  messageType: MessageType
}) {
  const [cursor, setCursor] = useState<Date>()
  const { data, error, isLoading } = useGetMessageList({
    userId,
    type: messageType,
    cursor,
    limit: 3,
    order: 'desc',
  })

  if (isLoading) return <div>keep loading...</div>
  if (error) return <div>error: fetching messages</div>
  if (!data) return <div>no data</div>

  const dateFormat = (e: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }

    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(e).replace(' ', '').replace(',', '')
  }
  return (
    <div className='max-w-[390px]'>
      <div className='pt-2 w-full'>
        {data.messageList.map((message: Message) => (
          <div key={message.messageId}>
            <Link
              href={`/messagebox/${userId}/${messageType}/${message.messageId}`}
              className='flex items-center gap-[9px]'
            >
              <div className='relative bg-white w-full rounded-2xl flex justify-between h-[106px] px-[20px] py-[14px] gap-[5px] mb-[12px]'>
                <div className='w-full flex gap-[16px] mt-[4px]  mb-[6px]'>
                  <Image
                    src='/unread_icon.svg'
                    alt='unread icon'
                    width={49}
                    height={49}
                  />
                  <div className='flex flex-col justify-between '>
                    <div className='text-[#333D4B] font-semibold text-[17px] h-[20px] mb-[4px] leading-none'>
                      {messageType === 'received'
                        ? '퐁이 도착했어요!'
                        : '퐁을 보냈어요!'}
                    </div>
                    <div className='text-gray-3 text-[14px] h-[20px] leading-[130%] tracking-[-0.75px]'>
                      {messageType === 'received'
                        ? message.readAt instanceof Date
                          ? `${message.content}`
                          : '소중한 진심을 확인해보세요'
                        : `${message.content}`}
                    </div>
                    <div className='text-[#C5C5C5] font-medium h-[14px] text-[12px] mt-1'>
                      {message.createdAt && dateFormat(message.createdAt)}
                    </div>
                  </div>
                </div>
                {!message.readAt && (
                  <div className='absolute top-0 right-0 m-[14px] w-[8px] h-[8px] bg-[#FF5F5F] rounded-full'></div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
