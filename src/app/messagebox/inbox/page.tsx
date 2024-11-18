'use client'
import InboxLayout from '@/shared/ui/layouts/InboxLayout'
import MessageItem from '@/features/messagebox/ui/MessageItem'

const data = {
  title: '쪽지가 도착했습니다!',
  desc: '소중한 진심을 확인해보세요',
  date: '2024.08.31 오후 11:57',
}

export default function Outbox() {
  return (
    <InboxLayout title={'쪽지함'}>
      <div className='w-full h-[67px] flex items-center gap-[10px]'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          받은 쪽지
        </h2>
        <div>total number</div>
      </div>
      <MessageItem title={data.title} desc={data.desc} date={data.date} />
    </InboxLayout>
  )
}
