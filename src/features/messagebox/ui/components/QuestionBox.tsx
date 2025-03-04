interface QuestionBoxProps {
  content?: string
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ content }) => {
  return (
    <div className='bg-white border-[1px] rounded-2xl h-fit flex flex-col w-full items-center mb-5'>
      <h3 className='text-sm font-semibold text-[#333D4B] bg-gray-1 w-full text-center py-3 rounded-t-2xl'>
        질문
      </h3>
      <p className='rounded-2xl text-sm text-[#6B7684] text-center my-2.5 mx-11'>
        {content}
      </p>
    </div>
  )
}
export default QuestionBox
