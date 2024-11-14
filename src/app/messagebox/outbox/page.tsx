'use client'
import InboxLayout from '@/shared/ui/layouts/InboxLayout'
import MessageItem from '../_components/MessageItem'

export default function Outbox() {
  const data = {
    title: '쪽지를 보냈습니다',
    desc: '안녕 땡땡아 나는 너가 좋아',
    date: '2024.08.31 오후 11:57',
  }

  return (
    <InboxLayout>
      <div className='w-full h-[67px] flex items-center gap-[10px]'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          보낸 쪽지
        </h2>
        <div>total number</div>
      </div>
      <MessageItem title={data.title} desc={data.desc} date={data.date} />
    </InboxLayout>
  )
}
