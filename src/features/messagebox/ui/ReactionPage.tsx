'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/Button'
import { DataType } from '@/features/messagebox/model/messagebox.types'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import ReactionList from '@/features/messagebox/ui/ReactionList'

export default function ReactionPage({
  messageType,
  userId,
  messageId,
}: {
  messageType: MessageType
  userId: number
  messageId: number
}) {
  const List: Array<keyof DataType> = ['감사', '사과', '응원', '화해']
  const router = useRouter()
  const onSubmit = () => {
    // 데이터 보내는 로직 추가
    router.push(`/messagebox/${userId}/${messageType}/${messageId}`)
  }

  return (
    <div className='w-full h-full'>
      {List.map((title) => (
        <div key={title} className='border-b-[6px] border-b-[#F6F7FC] w-full'>
          <ReactionList category={title} />
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
