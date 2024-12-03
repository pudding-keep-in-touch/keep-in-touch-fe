import Home from '@/features/home/home'

export default function HomePage({
  params: { userId },
}: {
  params: { userId: number }
}) {
  return <Home userId={userId} />
}
