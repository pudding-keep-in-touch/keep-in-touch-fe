import InboxLayout from '@/shared/ui/layouts/InboxLayout'
import ReactionItem from '@/features/messagebox/ui/ReactionItem'
import { DataType } from '@/features/messagebox/model/messagebox.types'

export default function ReactionPage() {
  const List: Array<keyof DataType> = ['감사', '사과', '응원', '화해']

  return (
    <InboxLayout title={'반응 보내기'}>
      {List.map((title) => (
        <ReactionItem key={title} category={title} />
      ))}
    </InboxLayout>
  )
}
