'use client'
import Image from 'next/image'
import Link from 'next/link'
import InboxLayout from '@/shared/ui/layouts/InboxLayout'
import MessageItem from '@/features/messagebox/ui/MessageItem'

const data = {
  title: '쪽지가 도착했습니다!',
  desc: '소중한 진심을 확인해보세요',
  date: '2024.08.31 오후 11:57',
}

export default function MessageBox() {
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
      <MessageItem title={data.title} desc={data.desc} date={data.date} />

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
      {/* <MessageItem title={data.title} desc={data.desc} date={data.date} /> */}

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
