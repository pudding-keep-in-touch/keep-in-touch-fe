import QuestionButton from '@/features/questions/ui/button/QuestionButton'
import Image from 'next/image'

export default function CompletePage() {
  return (
    <>
      <div className='flex flex-col min-h-screen items-center'>
        <div className='mt-[280px] flex flex-col w-[100%] items-center text-center'>
          <Image src='/send.svg' alt='send' width={80} height={80} />
          <h2 className='text-[#333D4B] text-l font-bold leading-[150%] mt-6 mb-60'>
            친구에게 퐁 보내기 완료!
          </h2>

          <div className='mb-4 text-[#6B6B6B]'>
            나도 쪽지를 받아보고 싶다면?
          </div>

          <QuestionButton />
        </div>
      </div>
    </>
  )
}
