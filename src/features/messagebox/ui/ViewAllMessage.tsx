'use client'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessagesBlock from '@/features/messagebox/ui/MessagesBlock'

export default function ViewAllMessage({
  messageType,
  userId,
}: {
  messageType: MessageType
  userId: number
}) {
  return (
    <div className='max-w-[390px] w-full'>
      <div className='w-full pb-6'>
        <MessagesBlock messageType='received' userId={userId} />
      </div>
      <div className='border-b-[6px] border-b-white w-full mb-2'></div>
      <div className='w-full pb-6'>
        <MessagesBlock messageType='sent' userId={userId} />
      </div>
    </div>
  )
}
