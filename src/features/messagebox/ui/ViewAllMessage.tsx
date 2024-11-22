'use client'
import Image from 'next/image'
import Link from 'next/link'
import MessageItem from '@/features/messagebox/ui/MessageItem'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { useState } from 'react'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'

const mockData = { userId: 1, nickname: 'John Doe' }
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
    userId: mockData.userId,
    type: messageType,
    cursor,
    limit: 3,
    order: 'desc',
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching messages.</div>

  return (
    <>
      <div className='h-[67px] w-full flex items-center justify-between mb-[10px]'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          받은 쪽지
        </h2>
        <Link
          href={`/messagebox/${mockData.userId}/received`}
          className='flex items-center gap-[9px]'
        >
          <div className='font-[16px] text-[#6B7684]'>더보기</div>
          <Image
            src='/nav_icon.svg'
            alt='watch more'
            width={18}
            height={18}
            style={{ width: 18, height: 18 }}
          />
        </Link>
      </div>

      {/* <div className='border-b-[6px] border-b-white w-full mt-[18px]'> */}
      {/* 데이터가 있는 경우 / 기본 height 영역 O */}
      {data ? (
        data.messageList.map((id) => (
          <div key={id.messageId}>
            <Link
              href={`/messagebox/${mockData.userId}/received/${id.messageId}`}
              className='flex items-center gap-[9px]'
            >
              <MessageItem messageId={id.messageId} />
            </Link>
          </div>
        ))
      ) : (
        <div className='flex flex-col items-center text-[#333D4B] pb-[162px] pt-[110px]'>
          <Image
            src='/no_msg.svg'
            alt='home_icon'
            width={65}
            height={57}
            style={{ width: 65, height: 57 }}
            priority
          />
          <p className='leading-none pt-[11px] text-[17px]'>
            아직 받은 쪽지가 없어요!
          </p>
        </div>
      )}
      {/* </div> */}

      {/* <div className='border-b-[6px] border-b-white w-screen mt-[18px]'></div> */}

      <div className='h-[67px] w-full flex items-center justify-between'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          보낸 쪽지
        </h2>
        <Link
          href={`/messagebox/${mockData.userId}/sent`}
          className='flex items-center gap-[9px]'
        >
          <div className='font-[16px] text-[#6B7684]'>더보기</div>
          <Image
            src='/nav_icon.svg'
            alt='watch more'
            width={18}
            height={18}
            style={{ width: 18, height: 18 }}
          />
        </Link>
      </div>
      {/* <OutboxList userId={mockData.userId} /> */}

      {/* 데이터가 없는 경우 */}
      <div className='flex flex-col items-center text-[#333D4B] pb-[180px] pt-[110px]'>
        <Image
          src='/no_msg.svg'
          alt='home_icon'
          width={65}
          height={57}
          style={{ width: 65, height: 57 }}
          priority
        />
        <p className='leading-none pt-[11px] text-[17px]'>
          아직 보낸 쪽지가 없어요!
        </p>
      </div>
    </>
  )
}
