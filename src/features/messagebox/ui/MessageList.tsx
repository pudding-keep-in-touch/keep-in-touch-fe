'use client'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import Link from 'next/link'
import Image from 'next/image'
import {
  Message,
  MessageResponse,
} from '@/features/messagebox/model/messagebox.types'

export default function MessageList({
  data,
  userId,
  messageType,
}: {
  data: MessageResponse
  userId: number
  messageType: MessageType
}) {
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
            >
              {!message.status || message.status === 'normal' ? (
                <div
                  className={`relative ${messageType === 'sent' || message.readAt ? '' : 'border border-[#35b6ff]'} bg-white w-full rounded-2xl h-[106px] items-start flex justify-start pl-[20px] pr-[27px] py-[18px] gap-4 mb-3`}
                >
                  {message.readAt ? (
                    <Image
                      src='/read_icon.svg'
                      alt='read icon'
                      width={49}
                      height={49}
                    />
                  ) : (
                    <Image
                      src='/unread_icon.svg'
                      alt='unread icon'
                      width={49}
                      height={49}
                    />
                  )}

                  <div className='flex flex-col'>
                    <div className='text-[#333D4B] font-semibold text-[17px] mb-[4px] leading-none'>
                      {messageType === 'received'
                        ? '퐁이 도착했어요!'
                        : '퐁을 보냈어요!'}
                    </div>
                    <div className='text-gray-3 text-[14px] h-[20px] leading-[130%] tracking-[-0.75px]'>
                      {messageType === 'received' && message.readAt === null
                        ? '소중한 진심을 확인해보세요'
                        : message.content}
                    </div>
                    <div className='text-[#C5C5C5] font-medium h-[14px] text-[12px] mt-[14px]'>
                      {message.createdAt && dateFormat(message.createdAt)}
                    </div>
                  </div>

                  {!message.readAt && messageType === 'received' && (
                    <div className='absolute top-0 right-0 m-[14px] w-[8px] h-[8px] bg-[#FF5F5F] rounded-full'></div>
                  )}
                </div>
              ) : (
                <div className='w-full'>
                  <div className='relative bg-white w-full rounded-2xl flex items-center h-[75px] gap-[16px] px-[20px] py-[13px] mb-[12px]'>
                    <Image
                      src='/hidden.svg'
                      alt='hidden message'
                      width={49}
                      height={49}
                    />
                    <div className='flex flex-col justify-between gap-2'>
                      <div className='text-[#6B7684] font-semibold text-[17px] h-[20px] leading-none'>
                        숨김 처리되었습니다.
                      </div>
                      <div className='text-[#C5C5C5] font-medium h-[14px] text-[12px]'>
                        {message.createdAt && dateFormat(message.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}