'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
// import { questionType } from '@/app/questions/util/type'
import { questions } from '@/app/questions/util/data'
import { useQueryClient } from '@tanstack/react-query'
import QuestionBox from '@/app/questions/_component/QuestionBox'

// export default function QuestionListPage({
//   questionId,
//   userId,
//   content,
//   createdAt,
// }: questionType) {

export default function QuestionListPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  //todo 로그인 state추가

  // const handleQuestionClick = (questionId: number) => {
  //   //todo 온보딩 페이지로 이동
  //   // router.push(`/onboarding?questionId=${questionId}`);
  //   router.push(`/questions/messages`)
  // }

  const handleQuestionClick = (questionId: number, content: string) => {
    // 선택된 질문 데이터를 캐싱
    queryClient.setQueryData(['selectedQuestion'], { questionId, content })
    // ReplyPage로 이동
    router.push('/questions/messages')
  }

  return (
    <>
      <div className='flex flex-col min-h-screen items-center'>
        <div className='mt-[80px] flex flex-col w-[100%] items-center text-center'>
          {/* todo 아이콘으로 수정 */}
          <Image
            src='/questionsKeepInTouchLogo.svg'
            alt='questionsKeepInTouchLogo'
            width={160}
            height={160}
          />
          <h2 className='text-[#333D4B] text-xl font-semibold leading-[150%] mt-6'>
            쪽지를 보내고 싶은 질문을 선택하세요!
          </h2>
        </div>

        <div className='w-full max-w-[32rem] px-6 py-10 grid grid-cols-1 gap-6'>
          {/* 자유질문 */}
          <QuestionBox
            questionId={99}
            variant='custom'
            // description='질문을 쓰지 않은 글쓰기 양식입니다. 자유롭게 쪽지를 보낼 수 있어요!'
            onClick={handleQuestionClick}
          />

          {/* 일반 질문 */}
          {questions.map((question) => (
            <QuestionBox
              key={question.questionId}
              questionId={question.questionId}
              content={question.content}
              onClick={handleQuestionClick}
            />
          ))}
        </div>
      </div>
    </>
  )
}
