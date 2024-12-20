'use client'
import { useGetMessageDetail } from '@/features/messagebox/_detail/api/detailQuery'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import Link from 'next/link'
import { cn } from '@/shared/utils/emotionVariety'
import Tooltip from '@/features/messagebox/ui/Tooltip'
import { Reactions } from '@/features/messagebox/model/messagebox.types'
import MessageItem from './MessageItem'
import MessageDetailLayout from '../_detail/ui/MessageDetailLayout'

export default function MessageDetail({
  userId,
  messageId,
  messageType,
}: {
  userId: string
  messageId: string
  messageType: MessageType
}) {
  const { data, isLoading, error } = useGetMessageDetail({
    messageId,
  })

  if (isLoading) return <div>임시 로딩중.</div>
  if (error) return <div>Error fetching message details.</div>
  if (!data) return null
  const questionType = data.question ? 'question' : 'emotion'
  const variety =
    questionType === 'question'
      ? 'bg-messageDetail'
      : data.emotion.emotionId === '1'
        ? 'bg-thanksPreview'
        : 'bg-honestTalkPreview'
  const makePaddingTop = variety === 'bg-messageDetail' ? '' : 'pt-32'
  const isNormal = data.status === 'normal'
  return (
    <MessageDetailLayout
      messageType={messageType}
      variety={variety}
      messageId={messageId}
      isNormal={isNormal}
    >
      <div
        className={cn(
          'w-full flex flex-col justify-center items-center text-black gap-4 px-6',
          makePaddingTop
        )}
      >
        <MessageItem data={data} variety={variety} messageId={messageId} />
        {messageType === 'received' && data.reactions?.length === 0 ? (
          <div className='fixed flex w-full justify-center items-center bottom-0 pb-[10px] max-w-[390px] z-10 mr-auto ml-auto'>
            <Tooltip>
              <Link
                href={`/messagebox/${userId}/${messageType}/${messageId}/reaction`}
                className='h-fit p-4 bg-black text-white rounded-2xl font-bold w-full flex justify-center items-center'
              >
                반응 보내기
              </Link>
            </Tooltip>
          </div>
        ) : (
          <div className='w-full flex flex-wrap gap-[8px]'>
            {data.reactions?.map((reaction: Reactions) => (
              <div key={reaction.reactionId} className='flex-none'>
                <div className='w-full p-[12px] h-[35px] bg-white bg-opacity-90 rounded-2xl flex items-center border-[0.5px] border-gray-2 gap-[4px]'>
                  <div>{reaction.emoji}</div>
                  <div className='w-full flex text-[15px] font-semibold leading-[68.1%] tracking-[-2%]'>
                    {reaction.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MessageDetailLayout>
  )
}
