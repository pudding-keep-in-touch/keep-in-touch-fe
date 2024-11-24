interface QuestionBoxProps {
  content?: string
}

// 자유질문일 경우? ++
const QuestionBox: React.FC<QuestionBoxProps> = ({ content }) => {
  return (
    <div className='bg-white border-[1px] rounded-2xl flex flex-col items-center'>
      <h3 className='text-sm font-semibold text-[#333D4B] bg-gray-1 w-full text-center py-3 rounded-md'>
        질문
      </h3>
      <p className='text-sm text-[#6B7684] text-center mt-3 mb-3'>{content}</p>
    </div>
  )
}
export default QuestionBox
