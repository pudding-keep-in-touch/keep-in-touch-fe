'use client'

import { Button } from '@/shared/components/Button'

export default function LinkShareButton({ userId }: { userId: number }) {
  function shareOnUrl() {
    const contentToCopy = `https://dev-fe.keep-in-touch.me/message/send/${userId}/select`

    const urlArea = document.createElement('textarea')
    document.body.appendChild(urlArea)
    urlArea.value = contentToCopy
    urlArea.select()
    document.execCommand('copy')
    document.body.removeChild(urlArea)
    alert('클립보드로 내 링크가 복사되었습니다.')
  }

  return (
    <Button
      type='button'
      className='h-fit p-[18px] bg-[#0788D1] text-white rounded-2xl font-bold w-full'
      onClick={shareOnUrl}
    >
      <h1 className='text-lg font-semibold text-center'>내 링크 전달하기</h1>
    </Button>
  )
}
