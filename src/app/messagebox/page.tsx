'use client'
import InboxLayout from '@/shared/ui/layouts/InboxLayout'
import Image from 'next/image'
import Link from 'next/link'
// import MessageItem from './_components/MessageItem'

export default function MessageBox() {
  const data = {
    title: '쪽지가 도착했습니다!',
    desc: '소중한 진심을 확인해보세요',
    date: '2024.08.31 오후 11:57',
  }
  return (
    <InboxLayout>
      <div className='h-[67px] w-full flex items-center justify-between mb-[10px]'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          받은 쪽지
        </h2>
        <Link href='/messagebox/inbox'>더보기</Link>
      </div>

      {/* 데이터가 있는 경우
      <MessageItem title={data.title} desc={data.desc} date={data.date} />
      <MessageItem title={data.title} desc={data.desc} date={data.date} />
      <MessageItem title={data.title} desc={data.desc} date={data.date} /> */}

      {/* 데이터가 없는 경우 */}
      <div className='flex flex-col items-center text-[#333D4B] pb-[162px] pt-[110px]'>
        <Image src='/no_msg.svg' alt='home_icon' width={65} height={57} />
        <p className='leading-none pt-[11px] text-[17px]'>
          아직 받은 쪽지가 없어요!
        </p>
      </div>

      <div className='border-b-[6px] border-b-white w-screen mt-[18px]'></div>

      <div className='h-[67px] w-full flex items-center justify-between'>
        <h2 className='font-semibold text-[18px] flex items-center'>
          보낸 쪽지
        </h2>
        <Link href='/messagebox/outbox'>더보기</Link>
      </div>

      {/* 데이터가 있는 경우
      <MessageItem title={data.title} desc={data.desc} date={data.date} />
      <MessageItem title={data.title} desc={data.desc} date={data.date} />
      <MessageItem title={data.title} desc={data.desc} date={data.date} /> */}

      <div className='flex flex-col items-center text-[#333D4B] pb-[180px] pt-[110px]'>
        <Image src='/no_msg.svg' alt='home_icon' width={65} height={57} />
        <p className='leading-none pt-[11px] text-[17px]'>
          아직 보낸 쪽지가 없어요!
        </p>
      </div>
    </InboxLayout>
  )
}
