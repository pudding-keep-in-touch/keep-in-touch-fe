'use client'

import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'

export default function QuestionButton() {
  const router = useRouter()
  const onClick = () => {
    router.push(`/`)
  }

  return (
    <Button
      type='button'
      className='h-fit p-4 px-28 bg-[#35B6FF] text-white rounded-2xl font-bold mt-auto '
      onClick={onClick}
    >
      내 질문 만들기
    </Button>
  )
}
