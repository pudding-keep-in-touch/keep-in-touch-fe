'use client'
import { MessageBoxType } from '../model/messagebox.types'

export default function MessageItem({ title, desc, date }: MessageBoxType) {
  return (
    <div className='relative bg-white w-full rounded-2xl flex justify-between h-[106px] px-[20px] py-[14px] gap-[5px] mb-[12px]'>
      <div className='w-full flex gap-[16px] mt-[4px]  mb-[6px]'>
        <div className='rounded-sm w-[49px] h-[49px] bg-black'></div>
        <div className='flex flex-col justify-between'>
          <div className='text-[#333D4B] font-semibold text-[17px] h-[20px] mb-[4px] leading-none'>
            {title}
          </div>
          <div className='text-[#474747] text-[14px] leading-[130%] h-[24px] tracking-[-0.75px] mb-[14px]'>
            {desc}
          </div>
          <div className='text-[#C5C5C5] font-medium h-[14px] text-[12px]'>
            {date}
          </div>
        </div>
      </div>

      <div className='absolute top-0 right-0 m-[14px] w-[8px] h-[8px] bg-[#FF5F5F] rounded-full'></div>
    </div>
  )
}
