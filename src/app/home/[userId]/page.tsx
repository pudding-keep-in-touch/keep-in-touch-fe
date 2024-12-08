import Home from '@/features/home/home'

export default function HomePage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  return <Home userId={userId} />
}
