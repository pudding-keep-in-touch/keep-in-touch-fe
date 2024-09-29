import MessageList, { varietyType } from './_components/message'

export default function Page({
  params: { variety, userId },
}: {
  params: { variety: varietyType; userId: number }
}) {
  return <MessageList variety={variety} userId={userId} />
}
