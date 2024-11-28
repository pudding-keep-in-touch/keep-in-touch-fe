import PreviewStepPage from '@/features/questions/ui/PreviewStepPage'

export default function Page({ userNickname }: { userNickname: string }) {
  return (
    <>
      <PreviewStepPage userNickname={userNickname} />
    </>
  )
}
