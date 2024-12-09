'use client'

import { Button } from '@/shared/components/Button'
import { FRONT_API_BASE_URL } from '@/shared/config/env'
import { useRouter } from 'next/navigation'

export default function LinkShareButton({
  userId,
  questionId,
  disabled,
}: {
  questionId: string
  userId: string
  disabled: boolean
}) {
  const router = useRouter()

  function shareOnUrl() {
    const contentToCopy = `${FRONT_API_BASE_URL}questions/${questionId}`

    const urlArea = document.createElement('textarea')
    document.body.appendChild(urlArea)
    urlArea.value = contentToCopy
    urlArea.select()
    document.execCommand('copy')
    document.body.removeChild(urlArea)

    localStorage.setItem('link_copy', contentToCopy)
    router.push(`/home/${userId}`)
  }

  return (
    <Button
      type='button'
      className='h-fit p-[18px] bg-system-blue text-white rounded-2xl font-bold w-full'
      onClick={shareOnUrl}
      disabled={disabled}
    >
      <h1 className='text-lg font-semibold text-center'>질문 공유하기</h1>
    </Button>
  )
}
