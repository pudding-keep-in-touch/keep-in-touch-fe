// import InboxLayout from '@/features/messagebox/_detail/ui/layouts/InboxLayout'
import ReactionList from '@/features/messagebox/ui/ReactionList'
import { DataType } from '@/features/messagebox/model/messagebox.types'

export default function Page() {
  const List: Array<keyof DataType> = ['감사', '사과', '응원', '화해']

  return (
    <>
      {/* // <InboxLayout messageType={'reaction'}>    */}
      {List.map((title) => (
        <ReactionList key={title} category={title} />
      ))}

      {/* // </InboxLayout> */}
    </>
  )
}
