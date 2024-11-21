'use client'
import InboxLayout from '@/features/messagebox/_detail/ui/layouts/InboxLayout'
import { NavigationBar } from '@/shared/ui/layouts/NavigationBar'
// import MessageItem from '@/features/messagebox/ui/MessageItem'

export default function Outbox() {
  return (
    <InboxLayout title={'쪽지함'}>
      <div className='w-full h-[67px] flex items-center gap-[10px]'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          보낸 쪽지
        </h2>
        <div>total number</div>
      </div>
      {/* 메인쪽지함 페이지에서 쪽지 데이터가 3개 미만이면 더보기 버튼으로 유입 불가 */}
      {/* <MessageItem title={data.title} desc={data.desc} date={data.date} /> */}
      <NavigationBar />
    </InboxLayout>
  )
}
