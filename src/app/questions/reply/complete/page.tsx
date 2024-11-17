import QuestionButton from '@/app/questions/reply/complete/QuestionButton'

export default function Complete() {
  return (
    <>
      <div className='flex flex-col min-h-screen items-center'>
        <div className='mt-[200px] flex flex-col w-[100%] items-center text-center'>
          {/* todo 이미지 수정 */}
          <div>이미지</div>
          <h2 className='text-[#333D4B] text-l font-bold leading-[150%] mt-6 mb-80'>
            친구에게 쪽지 보내기를 <br />
            완료하였습니다!
          </h2>

          <div className='mb-6 text-[#6B6B6B]'>
            나도 쪽지를 받아보고 싶다면?
          </div>

          <QuestionButton />
        </div>
      </div>
    </>
  )
}
