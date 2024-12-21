import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import ViewThreeMessages from '@/features/messagebox/ui/ViewThreeMessages'
export default function ViewAllMessage({
  userId,
}: {
  messageType: MessageType
  userId: string
}) {
  return (
    <div className='max-w-[390px] w-full bg-[#F7F7FC]'>
      <div className='w-full border-b-[6px] border-b-white mb-2'>
        <ViewThreeMessages messageType='received' userId={userId} />
      </div>
      <div className='w-full pb-6'>
        <ViewThreeMessages messageType='sent' userId={userId} />
      </div>
    </div>
  )
}
