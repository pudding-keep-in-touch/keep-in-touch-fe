import MessageList from './_components/message'

export default function Page({
  params: { userId },
}: {
  params: { userId: number }
}) {
  return <MessageList userId={userId} />
}
