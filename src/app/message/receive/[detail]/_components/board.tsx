'use client'

import MessageSendButton from './sendButton'
import MessageShareButton from './shareButton'

export default function MessageBoard() {
  return (
    <div className='absolute top-[350px] left-1/2 transform -translate-x-1/2 w-full flex flex-col gap-[75px]'>
      <div className='px-6 w-full'>
        <div className='bg-white bg-opacity-50 backdrop-blur rounded-2xl py-5 px-6 shadow-lg'>
          <div className='w-full overflow-y-auto max-h-96 text-lg text-[#191F28] leading-relaxed'>
            내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성
          </div>
          <p className='text-right mt-4 text-lg text-[#3C3C43] font-bold'>
            From. 홍길동
          </p>
        </div>
      </div>

      <div className='px-6 pb-6 w-full h-fit flex gap-2'>
        <MessageShareButton />
        <MessageSendButton />
      </div>
    </div>
  )
}
