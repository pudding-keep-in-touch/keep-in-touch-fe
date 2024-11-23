'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/shared/components/Button'
import { question } from '@/entities/questions/questionData'

export default function ReceiveLink() {
  const router = useRouter()

  const handleQuestionClick = (questionId: number) => {
    //todo 온보딩 페이지로 이동
    // router.push(`/onboarding?questionId=${questionId}`);
    router.push(`/questions/reply/${questionId}`)
  }

  return (
    <>
      <div className='flex flex-col min-h-screen items-center'>
        <div className='mt-[80px] flex flex-col w-[100%] items-center text-center'>
          <Image
            src='/questionsKeepInTouchLogo.svg'
            alt='questionsKeepInTouchLogo'
            width={160}
            height={160}
          />
          <h2 className='text-[#333D4B] text-xl font-semibold leading-[150%] mt-6'>
            쪽지를 익명으로 보낼 수 있어요!
          </h2>
        </div>
        <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'>
          <div
            key={question.questionId}
            className='bg-white rounded-lg border-[1px] border-[#CCE8F4] rounded-[12px] flex flex-col items-center'
          >
            <h3 className='text-sm font-semibold text-[#333D4B] bg-gray-100 w-full text-center py-3 rounded-md'>
              질문
            </h3>
            <p className='text-sm mt-3 mb-3 text-center'>{question.content}</p>
          </div>{' '}
          <Button
            type='button'
            onClick={() => handleQuestionClick(question.questionId)}
            className='h-fit p-4 bg-[#35B6FF] text-white rounded-2xl font-bold mt-80 w-full'
          >
            {' '}
            마음 전하러 가기
          </Button>
        </div>
      </div>
    </>
  )
}
