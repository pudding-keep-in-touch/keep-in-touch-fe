import SelectBoard from '@/features/message/_send/_select/ui/selectBoard'

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  return <SelectBoard userId={userId} />
}
