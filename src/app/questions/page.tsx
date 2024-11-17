'use client'

import { useRouter } from 'next/navigation'

export default function Receive() {
  const router = useRouter()

  //todo 로그인 state추가

  // 임시 데이터
  const questions = [
    {
      questionId: 1,
      title: '첫 번째 질문',
      content: '이것은 첫 번째 질문의 내용입니다.',
    },
    {
      questionId: 2,
      title: '두 번째 질문',
      content: '이것은 두 번째 질문의 내용입니다.',
    },
    {
      questionId: 3,
      title: '세 번째 질문',
      content: '이것은 세 번째 질문의 내용입니다.',
    },
  ]

  const handleQuestionClick = (questionId: number) => {
    //todo 온보딩 페이지로 이동
    // router.push(`/onboarding?questionId=${questionId}`);
    router.push(`/questions/reply/${questionId}`)
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
            쪽지를 보내고 싶은 질문을 선택하세요!
          </h2>
        </div>
        <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'>
          {/* 자유질문 영역 */}
          {/* todo 자유질문 클릭 시 기존의 플로우로 가도록 */}
          <div
            key={99}
            className='bg-white rounded-lg border-[1px] border-[#CCE8F4] rounded-[12px] flex flex-col items-center'
            onClick={() => handleQuestionClick(99)}
          >
            <h3 className='text-sm font-semibold text-[#333D4B] bg-gray-100 w-full text-center py-3 rounded-md '>
              자유질문
            </h3>
            <p className='text-sm text-[#6B7684] mt-3 mb-3 text-center text-[#B0BEC5]'>
              질문을 쓰지 않은 글쓰기 양식입니다. <br />
              자유롭게 쪽지를 보낼 수 있어요!
            </p>
          </div>

          {questions.map((question) => (
            <div
              key={question.questionId}
              className='bg-white rounded-lg border-[1px] border-[#CCE8F4] rounded-[12px] flex flex-col items-center'
              onClick={() => handleQuestionClick(question.questionId)}
            >
              <h3 className='text-sm font-semibold text-[#333D4B] bg-gray-100 w-full text-center py-3 rounded-md'>
                질문
              </h3>
              <p className='text-sm text-[#6B7684] mt-3 mb-3 text-center'>
                {question.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
