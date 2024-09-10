'use client'

import { useSearchParams } from 'next/navigation'
import MessageSendFloatingButton from '../../_components/floatingButton'

export default function MessageSendNextButton() {
  const searchParams = useSearchParams()

  const variety = searchParams.get('variety')

  return (
    <div className='fixed bottom-9 left-0 w-full px-8'>
      <MessageSendFloatingButton text='다음' disabled={!variety} />
    </div>
  )
}
