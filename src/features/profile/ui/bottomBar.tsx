'use client'

import { Button } from '@/shared/components/Button'

export default function BottomBar() {
  return (
    <div className='px-6 pb-6 w-full h-fit flex gap-[28px] justify-center items-center'>
      <Button
        type='button'
        variant='link'
        className='shrink-0 h-[56px] p-[18px] text-base text-[#474747] rounded-2xl font-bold w-[62px]'
      >
        로그아웃
      </Button>
      <img src='/Separator.svg' alt='Separator' />
      <Button
        type='button'
        variant='link'
        className='shrink-0 h-[56px] p-[18px] text-base  text-[#474747] rounded-2xl font-bold w-[62px]'
      >
        탈퇴하기
      </Button>
    </div>
  )
}
