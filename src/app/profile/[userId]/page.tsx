import Profile from '@/features/profile/ui/profile'

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  return <Profile userId={userId} />
}
