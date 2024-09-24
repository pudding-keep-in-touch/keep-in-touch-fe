import MessageList from './_components/select'

export default function Page({
  params: { userId },
}: {
  params: { userId: number }
}) {
  console.log('userId', userId)
  return (
    <>
      <MessageList userId={userId} />
    </>
  )
}
