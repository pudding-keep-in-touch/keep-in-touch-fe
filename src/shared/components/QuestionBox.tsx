import React from 'react'
import Image from 'next/image'

type QuestionBoxVariant = 'default' | 'custom'

interface QuestionBoxProps {
  questionId?: string
  content?: string
  variant?: QuestionBoxVariant
  onClick?: (questionId: string, content: string) => void
}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  questionId,
  content,
  variant = 'default',
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(questionId || '', content || '')
    }
  }

  return (
    <div
      className='bg-white rounded-lg border-[1px] border-[#CCE8F4] overflow-hidden cursor-pointer'
      onClick={handleClick}
    >
      {/* 상단 텍스트 */}
      <div className='text-sm font-semibold text-[#333D4B] bg-gray-100 text-center py-3 rounded-t-md'>
        {variant === 'custom' ? '자유질문' : '질문'}
      </div>

      {/* 하단 내용 */}
      {variant === 'custom' ? (
        <Image
          src='/freeQuestion.svg'
          alt='자유질문 이미지'
          width={340}
          height={340}
        />
      ) : (
        <p
          className='text-sm text-[#6B7684] text-center mt-3 mb-3'
          style={{ whiteSpace: 'pre-line' }}
        >
          {content}
        </p>
      )}
    </div>
  )
}

export default QuestionBox
