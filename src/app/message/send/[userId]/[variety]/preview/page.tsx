'use client'

import { useFormContext } from 'react-hook-form'
import { MessageFormValues } from '../_components/formSchema'
import { Button } from '@/shared/ui/components/Button'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { getValues } = useFormContext<MessageFormValues>()
  const router = useRouter()

  const { message } = getValues()

  const clickHandler = () => {
    router.back()
  }

  return (
    <>
      <div className='backdrop-blur-md bg-white/50 w-full min-h-[380px] rounded-2xl mt-[160px] px-6 py-5'>
        <p className='text-[#1F1F1F] font-bold text-lg mb-4'>To. 친구에게!</p>
        <p className='text-[#191F28] break-all whitespace-pre-wrap text-lg'>
          {message}
        </p>
      </div>
      <Button
        type='button'
        className='h-fit p-4 bg-[#1F1F1F] text-white rounded-2xl font-bold w-full mt-auto'
        onClick={clickHandler}
      >
        완료
      </Button>
    </>
  )
}
