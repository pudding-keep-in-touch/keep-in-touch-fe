'use client'

import { useGetDetailMessage } from '@/entities/message/api/queries'
import MessageSendButton from './sendButton'
import MessageShareButton from './shareButton'
import { useEffect, useState } from 'react'
import { DmList } from '@/entities/message/model/types'

export default function MessageBoard({
  directMessageId,
}: {
  directMessageId: number
}) {
  const [message, setMessage] = useState<DmList>()
  const { data } = useGetDetailMessage({ directMessageId })

  useEffect(() => {
    setMessage(data)
  }, [data])

  return (
    <div className='absolute top-[350px] left-1/2 transform -translate-x-1/2 w-full flex flex-col gap-[75px]'>
      <div className='px-6 w-full'>
        <div className='bg-white bg-opacity-50 backdrop-blur rounded-2xl py-5 px-6 shadow-lg'>
          <div className='w-full overflow-y-auto max-h-96 text-lg text-[#191F28] leading-relaxed'>
            {message?.content}
          </div>
          <p className='text-right mt-4 text-lg text-[#3C3C43] font-bold'>
            From. {message?.senderId}
          </p>
        </div>
      </div>

      {/* <div className='px-6 pb-6 w-full h-fit flex gap-2'> */}
      {/* <MessageShareButton /> */}
      <div className='px-6 pb-6'>
        <MessageSendButton />
      </div>
      {/* </div> */}
    </div>
  )
}
