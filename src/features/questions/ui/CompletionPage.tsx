'use client'

import Preview from '@/app/questions/messages/completion/Preview'
import ReplyButton from '@/features/questions/ui/button/ReplyButton'
import Step from '@/shared/ui/Step'

export default function CompletionPage() {
  const steps = [1, 2]

  return (
    <div className='flex-grow w-full h-screen pt-[30px] h-815:pb-[250px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
      <div className='grid flex items-center justify-center'>
        <div className='mb-5 '>
          <Step steps={steps} active={2} />
        </div>
      </div>

      <p className='font-medium text-lg mb-10 text-center'>
        쪽지가 완성되었습니다.
        <br />
        미리보기로 내용을 확인하세요!
      </p>

      <Preview />

      <ReplyButton />
    </div>
  )
}
