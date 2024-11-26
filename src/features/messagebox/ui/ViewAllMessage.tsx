'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { useState } from 'react'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageList from '@/features/messagebox/ui/MessageList'

// userId, userId: number,
export default function ViewAllMessage({
  messageType,
  userId,
}: {
  messageType: MessageType
  userId: number
}) {
  // const { data } = useGetMessageList({ userId })
  // const { received_message_count, nextCursor, messageList } = data
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

  return (
    <div className='max-w-[390px]'>
      <div className='w-full pb-6 px-6'>
        <div className='h-[67px] w-full flex items-center justify-between'>
          <h2 className='font-semibold text-[18px] flex items-center'>
            받은 퐁 ({data.receivedMessageCount || 0})
          </h2>
          {data.receivedMessageCount! > 3 && (
            <Link
              href={`/messagebox/${userId}/received`}
              className='flex items-center gap-[9px]'
            >
              <p className=' text-[#6B7684]'>더보기</p>
              <Image
                src='/nav_icon.svg'
                alt='watch more'
                width={18}
                height={18}
              />
            </Link>
          )}
        </div>
        {data ? (
          <MessageList data={data} messageType={'received'} userId={userId} />
        ) : (
          <div className='flex flex-col items-center text-[#333D4B] pb-[162px] pt-[110px]'>
            <Image src='/no_msg.svg' alt='home_icon' width={65} height={57} />
            <p className='leading-none pt-[11px] text-[17px]'>
              아직 받은 퐁이 없어요!
            </p>
          </div>
        )}
      </div>
      <div className='border-b-[6px] border-b-white w-full mb-2'></div>
      <div className='w-full pb-6 px-6'>
        <div className='h-[67px] w-full flex items-center justify-between'>
          <h2 className='font-semibold text-[18px] flex items-center'>
            보낸 퐁 ({data?.sentMessageCount || 0})
          </h2>
          {data.sentMessageCount! > 3 && (
            <Link
              href={`/messagebox/${userId}/sent`}
              className='flex items-center gap-[9px]'
            >
              <div className='font-[16px] text-[#6B7684]'>더보기</div>
              <Image
                src='/nav_icon.svg'
                alt='watch more'
                width={18}
                height={18}
              />
            </Link>
          )}
        </div>
        {data ? (
          <MessageList data={data} messageType={'sent'} userId={userId} />
        ) : (
          <div className='flex flex-col items-center text-[#333D4B] pb-[162px] pt-[110px]'>
            <Image src='/no_msg.svg' alt='home_icon' width={65} height={57} />
            <p className='leading-none pt-[11px] text-[17px]'>
              아직 보낸 퐁이 없어요!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
