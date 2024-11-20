import React from 'react'

type QuestionBoxVariant = 'default' | 'custom'

interface QuestionBoxProps {
  questionId: number
  content?: string
  description?: string // 자유질문의 설명 추가
  variant?: QuestionBoxVariant
  onClick?: (questionId: number, content: string) => void
}

//todo 추후 랜덤 문구들 추가
const DescriptionData = {
  description: (
    <>
      질문을 쓰지 않은 글쓰기 양식입니다. <br />
      자유롭게 쪽지를 보낼 수 있어요!
    </>
  ),
}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  questionId,
  content,
  variant = 'default',
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(questionId, content || '')
    }
  }

  return (
    <div
      className='bg-white rounded-lg border-[1px] border-[#CCE8F4] rounded-[12px] flex flex-col items-center'
      onClick={handleClick}
    >
      <h3 className='text-sm font-semibold text-[#333D4B] bg-gray-100 w-full text-center py-3 rounded-md'>
        {variant === 'custom' ? '자유질문' : '질문'}
      </h3>
      <p className='text-sm text-[#6B7684] text-center mt-3 mb-3'>
        {variant === 'custom' ? DescriptionData.description : content}
      </p>
    </div>
  )
}

export default QuestionBox
