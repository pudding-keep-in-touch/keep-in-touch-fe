'use client'

import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'

export default function QuestionButton() {
  const router = useRouter()
  const onClick = () => {
    //todo questionId 변경 필요
    router.push(`/`)
  }

  return (
    <Button
      type='button'
      className='h-fit p-4 bg-[#35B6FF] text-white rounded-2xl font-bold mt-auto w-full'
      onClick={onClick}
    >
      내 질문 만들기
    </Button>
  )
}
