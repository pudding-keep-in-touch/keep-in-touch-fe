import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'

type PreviewButtonProps = {
  questionId: number
}

export default function PreviewButton({ questionId }: PreviewButtonProps) {
  const router = useRouter()
  const clickHandler = () => {
    router.push(`/questions/reply/${questionId}/preview`)
  }

  return (
    <>
      <Button
        type='button'
        className='w-full h-fit p-4 text-[#1F1F1F] bg-[#CCE0EB] rounded-2xl font-bold hover:bg-slate-300'
        onClick={clickHandler}
      >
        미리보기
      </Button>
    </>
  )
}
