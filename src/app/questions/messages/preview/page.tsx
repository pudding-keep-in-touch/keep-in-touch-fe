import PreviewPage from '@/features/questions/ui/PreviewPage'

export default function Page({ userNickname }: { userNickname: string }) {
  return (
    <>
      <PreviewPage userNickname={userNickname} />
    </>
  )
}
