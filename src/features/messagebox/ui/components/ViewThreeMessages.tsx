'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useGetMessageList } from '@/features/messagebox/_detail/api/detailQuery'
import { MessageType } from '@/shared/types/common.types'
import MessageList from '@/features/messagebox/ui/components/MessageList'
import { Spinner } from '@/shared/components/Spinner'

export default function MessagesBlock({
  messageType,
  userId,
}: {
  messageType: MessageType
  userId: string
}) {
  const { data, isLoading } = useGetMessageList({
    userId,
    type: messageType,
    cursor: null,
    limit: 3,
    order: 'desc',
  })

  const messageCount =
    messageType === 'sent'
      ? data?.sentMessageCount || 0
      : data?.receivedMessageCount || 0

  const moreLink = messageCount > 3 && (
    <Link
      href={`/messagebox/${userId}/${messageType}`}
      className='flex items-center gap-[9px]'
    >
      <p className='text-[#6B7684]'>더보기</p>
      <Image src='/nav_icon.svg' alt='watch more' width={18} height={18} />
    </Link>
  )

  const description =
    messageType === 'sent' ? '아직 보낸 퐁이 없어요!' : '아직 받은 퐁이 없어요!'

  return (
    <div className='max-w-[390px] px-6 w-full min-h-[368px] h-full'>
      <div className='w-full h-[67px] flex items-center justify-between gap-1'>
        <h2 className='font-semibold text-[18px] flex items-center gap-2'>
          <div>{messageType === 'sent' ? '보낸 퐁' : '받은 퐁'}</div>
          <div>({messageCount})</div>
        </h2>
        {moreLink}
      </div>
      <div className='max-h-[382px] w-full'>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='h-full mb-5'>
            {messageCount > 0 ? (
              <MessageList
                messages={data}
                userId={userId}
                messageType={messageType}
              />
            ) : (
              <div className='flex flex-col items-center text-[#333D4B] pb-[162px] pt-[110px]'>
                <Image
                  src='/no_msg.svg'
                  alt='home_icon'
                  width={65}
                  height={57}
                />
                <p className='leading-none pt-[11px] text-[17px]'>
                  {description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
