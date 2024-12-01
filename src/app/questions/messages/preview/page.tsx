import PreviewPage from '@/features/questions/ui/PreviewPage'

export default function Page({ nickname }: { nickname: string }) {
  return (
    <>
      <PreviewPage nickname={nickname} />
    </>
  )
}
