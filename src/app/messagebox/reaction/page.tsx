import InboxLayout from '@/shared/ui/layouts/InboxLayout'
import ReactionItem from '../_components/ReactionItem'

type Item = {
  id: number
  emoji: string
  name: string
}
type DataType = {
  감사: Item[]
  사과: Item[]
  응원: Item[]
  화해: Item[]
}

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
