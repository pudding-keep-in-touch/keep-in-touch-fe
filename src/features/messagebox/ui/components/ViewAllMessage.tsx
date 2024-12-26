import { MessageType } from '@/shared/types/common.types'
import ViewThreeMessages from '@/features/messagebox/ui/components/ViewThreeMessages'

export default function ViewAllMessage({
  userId,
}: {
  messageType: MessageType
  userId: string
}) {
  return (
    <div className='max-w-[390px] w-full'>
      <div className='w-full border-b-[6px] border-b-white mb-2'>
        <ViewThreeMessages messageType='received' userId={userId} />
      </div>
      <div className='w-full mb-2'>
        <ViewThreeMessages messageType='sent' userId={userId} />
      </div>
    </div>
  )
}
