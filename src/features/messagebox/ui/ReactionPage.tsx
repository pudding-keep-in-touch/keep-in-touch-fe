'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/Button'
import { EmojiProps } from '@/features/messagebox/model/messagebox.types'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import ReactionList from '@/features/messagebox/ui/ReactionList'
import { useGetEmoji } from '../_detail/api/detailQuery'

export default function ReactionPage({
  messageType,
  userId,
  messageId,
}: {
  messageType: MessageType
  userId: number
  messageId: number
}) {
  const lists = ['감사', '사과', '응원', '화해']
  const router = useRouter()
  const onSubmit = () => {
    // 데이터 보내는 로직 추가
    router.push(`/messagebox/${userId}/${messageType}/${messageId}`)
  }

  const { data, error, isLoading } = useGetEmoji()

  if (isLoading) return <div>임시 로딩중..</div>
  if (error) return <div>Error fetching emojis.</div>
  if (!data) return null

  // 데이터 그룹화
  const groupedData: Record<EmojiProps['type'], EmojiProps[]> = lists.reduce(
    (acc, type) => {
      acc[type] = [] // 초기화
      return acc
    },
    {} as Record<EmojiProps['type'], EmojiProps[]>
  )

  data.forEach((item) => {
    if (groupedData[item.type]) {
      groupedData[item.type].push(item) // 해당 유형의 배열에 추가
    }
  })

  return (
    <div className='w-full h-full'>
      {lists.map((type) => (
        <div
          key={type}
          className='w-full flex flex-col py-[20px] h-full border-b-[6px] border-b-gray-1'
        >
          <h2 className='text-base font-semibold tracking-[-0.75px]'>{type}</h2>
          <div className='flex w-full flex-wrap gap-2 pt-[20px]'>
            {groupedData[type].map((item) => (
              <div key={item.templateId}>
                <ReactionList data={item} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button
        type='button'
        onClick={onSubmit}
        className='h-fit p-4 bg-[#35B6FF] text-white rounded-2xl font-bold w-full'
      >
        완료
      </Button>
    </div>
  )
}
