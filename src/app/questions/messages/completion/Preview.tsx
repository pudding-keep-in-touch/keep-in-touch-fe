import PreviewStepPage from '@/features/questions/ui/PreviewStepPage'

export default function Page({ nickname }: { nickname: string }) {
  return (
    <>
      <PreviewStepPage nickname={nickname} />
    </>
  )
}
