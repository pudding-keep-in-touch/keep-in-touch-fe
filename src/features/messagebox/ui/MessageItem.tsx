'use client'
import { useGetMessageDetail } from '@/features/messagebox/_detail/api/detailQuery'

// userId, messageType
export default function MessageItem({ messageId }: { messageId: number }) {
  const { data, error, isLoading } = useGetMessageDetail({ messageId })
  if (isLoading) return <div>임시 로딩중</div>
  if (error) return <div>Error fetching message details.</div>
  if (!data) return null // data가 없으면 null
  return (
    <div className='relative bg-white w-full rounded-2xl flex justify-between h-[106px] px-[20px] py-[14px] gap-[5px] mb-[12px]'>
      <div className='w-full flex gap-[16px] mt-[4px]  mb-[6px]'>
        <div className='rounded-sm w-[49px] h-[49px] bg-black'></div>
        <div className='flex flex-col justify-between'>
          <div className='text-[#333D4B] font-semibold text-[17px] h-[20px] mb-[4px] leading-none'>
            {data.question?.content}
          </div>
          <div className='text-[#474747] text-[14px] leading-[130%] h-[24px] tracking-[-0.75px] mb-[14px]'>
            {data.content}
          </div>
          <div className='text-[#C5C5C5] font-medium h-[14px] text-[12px]'>
            {data.createdAt}
          </div>
        </div>
      </div>

      <div className='absolute top-0 right-0 m-[14px] w-[8px] h-[8px] bg-[#FF5F5F] rounded-full'></div>
    </div>
  )
}
