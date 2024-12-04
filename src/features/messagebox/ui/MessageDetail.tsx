'use client'
import { useGetMessageDetail } from '@/features/messagebox/_detail/api/detailQuery'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import Link from 'next/link'
import QuestionBox from '@/features/messagebox/_detail/ui/component/QuestionBox'
import MessageBoard from '@/features/messagebox/_detail/ui/component/MessageBoard'
import Tooltip from '@/features/messagebox/ui/Tooltip'
import { Reactions } from '@/features/messagebox/model/messagebox.types'

export default function MessageDetail({
  userId,
  messageId,
  messageType,
}: {
  userId: number
  messageId: number
  messageType: MessageType
}) {
  const { data, isLoading, error } = useGetMessageDetail({ messageId })

  if (isLoading) return <div>임시 로딩중.</div>
  if (error) return <div>Error fetching message details.</div>
  if (!data) return null

  return (
    <div className='w-full h-full flex flex-col justify-center items-center text-black gap-4 px-6'>
      <QuestionBox content={data.data.question.content} />
      <MessageBoard
        receiverNickname={data.data.receiverNickname}
        content={data.data.content}
      />
      {messageType === 'received' && data.data.reactions?.length === 0 ? (
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
          {data.data.reactions?.map((reaction: Reactions) => (
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
  )
}
