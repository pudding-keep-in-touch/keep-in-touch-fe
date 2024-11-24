import { useRandomDescriptionQuery } from '@/features/questions/hooks/query/useRandomDescriptionQuery'
import React from 'react'

type QuestionBoxVariant = 'default' | 'custom'

interface QuestionBoxProps {
  questionId?: string
  content?: string
  description?: string // 자유질문의 설명 추가
  variant?: QuestionBoxVariant
  onClick?: (questionId: string, content: string) => void
}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  questionId,
  content,
  variant = 'default',
  onClick,
}) => {
  const { data: randomDescription } = useRandomDescriptionQuery()
  const handleClick = () => {
    if (onClick) {
      onClick(questionId || '', content || '')
    }
  }

  return (
    <div
      className='bg-white rounded-lg border-[1px] border-[#CCE8F4] rounded-[12px] flex flex-col items-center cursor-pointer'
      onClick={handleClick}
    >
      <h3 className='text-sm font-semibold text-[#333D4B] bg-gray-100 w-full text-center py-3 rounded-md'>
        {variant === 'custom' ? '자유질문' : '질문'}
      </h3>
      <p
        className='text-sm text-[#6B7684] text-center mt-3 mb-3'
        style={{ whiteSpace: 'pre-line' }}
      >
        {variant === 'custom' ? randomDescription : content}
      </p>
    </div>
  )
}
export default QuestionBox
