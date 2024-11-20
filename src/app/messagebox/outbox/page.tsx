'use client'
import InboxLayout from '@/shared/ui/layouts/InboxLayout'
// import MessageItem from '@/features/messagebox/ui/MessageItem'

// const data = {
//   title: '쪽지를 보냈습니다',
//   desc: '안녕 땡땡아 나는 너가 좋아',
//   date: '2024.08.31 오후 11:57',
// }

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
    </InboxLayout>
  )
}
