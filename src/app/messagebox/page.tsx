'use client'
import Image from 'next/image'
import Link from 'next/link'
import InboxLayout from '@/features/messagebox/_detail/ui/layouts/InboxLayout'
import MessageItem from '@/features/messagebox/ui/MessageItem'
import InboxList from '@/features/messagebox/ui/InboxList'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { useState } from 'react'

const mockData = { userId: 1, nickname: 'John Doe' }
export default function MessageBox() {
  // const { data } = useGetMessageList({ userId })
  // const { received_message_count, nextCursor, messageList } = data
  const [cursor, setCursor] = useState<Date>()
  const { data } = useGetMessageList({
    userId: mockData.userId,
    type: 'received',
    cursor,
    limit: 3,
    order: 'desc',
  })
  return (
    <InboxLayout title={'쪽지함'}>
      <div className='h-[67px] w-full flex items-center justify-between mb-[10px]'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          받은 쪽지
        </h2>
        <Link href='/messagebox/inbox' className='flex items-center gap-[9px]'>
          <div className='font-[16px] text-[#6B7684]'>더보기</div>
          <Image src='/nav_icon.svg' alt='watch more' width={18} height={18} />
        </Link>
      </div>

      {/* 데이터가 있는 경우 / 기본 height 영역 O */}
      {/* <InboxList userId={mockData.userId} /> */}
      {data?.messageList.map((message) => (
        <MessageItem key={message.messageId} messageId={message.messageId} />
      ))}
      {/* 데이터가 없는 경우 */}
      {/* <div className='flex flex-col items-center text-[#333D4B] pb-[162px] pt-[110px]'>
        <Image src='/no_msg.svg' alt='home_icon' width={65} height={57} />
        <p className='leading-none pt-[11px] text-[17px]'>
          아직 받은 쪽지가 없어요!
        </p>
      </div> */}

      <div className='border-b-[6px] border-b-white w-screen mt-[18px]'></div>

      <div className='h-[67px] w-full flex items-center justify-between'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          보낸 쪽지
        </h2>
        <Link href='/messagebox/outbox' className='flex items-center gap-[9px]'>
          <div className='font-[16px] text-[#6B7684]'>더보기</div>
          <Image src='/nav_icon.svg' alt='watch more' width={18} height={18} />
        </Link>
      </div>

      {/* 데이터가 있는 경우 */}

      {/* <OutboxList userId={mockData.userId} /> */}

      {/* 데이터가 없는 경우 */}
      <div className='flex flex-col items-center text-[#333D4B] pb-[180px] pt-[110px]'>
        <Image src='/no_msg.svg' alt='home_icon' width={65} height={57} />
        <p className='leading-none pt-[11px] text-[17px]'>
          아직 보낸 쪽지가 없어요!
        </p>
      </div>
    </InboxLayout>
  )
}
