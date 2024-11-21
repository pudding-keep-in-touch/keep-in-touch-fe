'use client'

import { Button } from '@/shared/components/Button'
import { useRouter } from 'next/navigation'

export default function LinkShareButton({ userId }: { userId: number }) {
  const router = useRouter()
  const userIdString = userId?.toString()

  function shareOnUrl() {
    const contentToCopy = `https://dev-fe.keep-in-touch.me/message/send/${userId}/select`

    const urlArea = document.createElement('textarea')
    document.body.appendChild(urlArea)
    urlArea.value = contentToCopy
    urlArea.select()
    document.execCommand('copy')
    document.body.removeChild(urlArea)

    localStorage.setItem('link_copy', userIdString)
    router.push(`/home/${userId}`)
  }

  return (
    <Button
      type='button'
      className='h-fit p-[18px] bg-system-blue text-white rounded-2xl font-bold w-full'
      onClick={shareOnUrl}
    >
      <h1 className='text-lg font-semibold text-center'>질문 공유하기</h1>
    </Button>
  )
}
