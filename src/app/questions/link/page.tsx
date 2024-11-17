'use client'

import { Button } from '@/shared/ui/components/Button'

export default function ReceiveLink() {
  //임시 데이터
  const question = {
    id: 1,
    title: '첫 번째 질문',
    content: '이것은 첫 번째 질문의 내용입니다.',
  }

  const sendReply = () => {
    console.log('click')
  }

  return (
    <>
      <div className='flex flex-col min-h-screen items-center'>
        <div className='mt-[80px] flex flex-col w-[100%] items-center text-center'>
          {/* todo 아이콘으로 수정 */}
          <h1 className='text-[#00AFFF] text-2xl font-bold leading-[150%]'>
            너에게 닿기를
          </h1>
          <h2 className='text-[#333D4B] text-xl font-bold leading-[150%] mt-2'>
            쪽지를 익명으로 보낼 수 있어요!
          </h2>
        </div>
        <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'>
          <div
            key={question.id}
            className='bg-white rounded-lg border-[1px] border-[#CCE8F4] rounded-[12px] flex flex-col items-center'
          >
            <h3 className='text-sm font-semibold text-[#333D4B] bg-gray-100 w-full text-center py-3 rounded-md'>
              질문
            </h3>
            <p className='text-sm mt-3 mb-3 text-center'>{question.content}</p>
          </div>
          <Button
            type='submit'
            onClick={sendReply}
            className='mt-80 bg-[#00AFFF] text-white py-5 px-6 w-full rounded-lg'
          >
            {' '}
            쪽지 보내기
          </Button>
        </div>
      </div>
    </>
  )
}
