'use client'
import { useGetMessageDetail } from '@/features/messagebox/_detail/api/detailQuery'
import { MessageType } from '@/shared/types/common.types'
import Link from 'next/link'
import { cn } from '@/shared/utils/emotionVariety'
import Tooltip from '@/features/messagebox/ui/components/Tooltip'
import { Reactions } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageItem from '@/features/messagebox/ui/components/MessageItem'
import MessageDetailLayout from '@/features/messagebox/ui/layouts/MessageDetailLayout'
import { Spinner } from '@/shared/components/Spinner'

export default function MessageDetail({
  userId,
  messageId,
  messageType,
}: {
  userId: string
  messageId: string
  messageType: MessageType
}) {
  const { data, isLoading } = useGetMessageDetail({
    messageId,
  })
  if (!data) return null
  const questionType = data.question ? 'question' : 'emotion'
  const variety =
    questionType === 'question'
      ? 'bg-messageDetail'
      : data.emotion.emotionId === '1'
        ? 'bg-thanksPreview'
        : 'bg-honestTalkPreview'

  const makePaddingTop = variety === 'bg-messageDetail' ? '' : 'my-auto'
  const isNormal = data.status === 'normal'

  return (
    <MessageDetailLayout
      userId={userId}
      messageType={messageType}
      variety={variety}
      messageId={messageId}
      isNormal={isNormal}
    >
      <div
        className={cn(
          'w-full flex flex-col pb-16 h-full justify-between items-center bg-center bg-cover text-black',
          makePaddingTop
        )}
      >
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <div
              className={cn(
                'max-w-[390px] px-6 w-full h-fit flex flex-col',
                makePaddingTop
              )}
            >
              <div
                className={
                  variety === 'bg-messageDetail'
                    ? 'h-full flex flex-col w-full'
                    : 'w-full '
                }
              >
                <MessageItem
                  data={data}
                  variety={variety}
                  messageId={messageId}
                />
              </div>
              {data.reactions?.length > 0 && (
                <div className='w-full flex flex-wrap gap-[8px] mt-5'>
                  {data.reactions?.map((reaction: Reactions) => (
                    <div key={reaction.reactionId} className='flex-none'>
                      <div className='w-full p-[12px] h-[35px] bg-white bg-opacity-90 rounded-2xl flex items-center border-[0.5px] border-none gap-[4px]'>
                        <div>{reaction.emoji}</div>
                        <div className='w-full flex text-[15px] font-semibold leading-[68.1%] tracking-[-2%]'>
                          {reaction.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className='h-full w-full '>
                {messageType === 'received' && data.reactions?.length === 0 && (
                  <div className='absolute flex justify-center items-start bottom-0 left-0 w-full pb-[30px] px-6'>
                    <Tooltip>
                      <Link
                        href={`/messagebox/${userId}/${messageType}/${messageId}/reaction`}
                        className='h-fit p-4 bg-black text-white rounded-2xl font-bold w-full flex justify-center items-center'
                      >
                        반응 보내기
                      </Link>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      </div>
    </MessageDetailLayout>
  )
}
