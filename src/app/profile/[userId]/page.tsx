import Profile from './_components/profile'

export default function Page({
  params: { userId },
}: {
  params: { userId: number }
}) {
  return <Profile userId={userId} />
}
