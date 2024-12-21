import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'

export default function PreviewButton() {
  const router = useRouter()
  const onClickPreviewHandler = () => {
    router.push(`/questions/messages/preview`)
  }

  return (
    <>
      <Button
        type='button'
        className='w-full h-fit p-4 text-[#1F1F1F] bg-[#CCE0EB] rounded-2xl font-bold hover:bg-slate-300'
        onClick={onClickPreviewHandler}
      >
        미리보기
      </Button>
    </>
  )
}
