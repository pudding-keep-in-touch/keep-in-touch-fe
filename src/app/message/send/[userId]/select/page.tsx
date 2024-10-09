import SelectBoard from './_components/selectBoard'

export default function Page({
  params: { userId },
}: {
  params: { userId: number }
}) {
  return <SelectBoard userId={userId} />
}
