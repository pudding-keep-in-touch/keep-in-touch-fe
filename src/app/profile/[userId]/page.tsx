import Profile from '@/features/profile/ui/profile'

export default function Page({
  params: { userId },
}: {
  params: { userId: number }
}) {
  return <Profile userId={userId} />
}
