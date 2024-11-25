import React, { LegacyRef } from 'react'
import { TypeQuestionCard } from '@/features/home/ui/typeQuestionCard'
import { QuestionsList } from '@/features/home/ui/questionsList'
import { QuestionBanner } from '@/features/home/ui/questionBanner'
import { HomeScrollToTopStep } from '@/shared/hooks/useScrollToTop'
import Image from 'next/image'
import { QuestionListHeader } from './questionListHeader'

const mockData = [
  {
    id: 1,
    title: '질문',
    description: '나에게 하고 싶었던 말이 있다면?',
  },
  {
    id: 2,
    title: '질문',
    description: '그동안 하지 못했던 말을 해줘! 아무말이라도 써주셈요',
  },
  {
    id: 3,
    title: '질문',
    description:
      '이건 테스트인데요 아무말이나 해주면 걍 답변어쩌구 저쩌구 문장 길이를 테스트하기 위한 겁니다요',
  },
  {
    id: 4,
    title: '질문',
    description: '너희가 가장 기억하는 나의 모습은 어떤 모습일까?',
  },
  {
    id: 5,
    title: '질문',
    description: '나와 함께한 가장 즐거운 순간은 언제였어?',
  },
  {
    id: 6,
    title: '질문',
    description: '나와의 추억 중 가장 웃겼던 일은 뭐였을까?',
  },
  {
    id: 7,
    title: '질문',
    description: '내가 너희들에게 어떤 존재였는지 궁금해!',
  },
  {
    id: 8,
    title: '질문',
    description: '내가 고치면 좋겠다고 생각한 점이 있다면?',
  },
  {
    id: 9,
    title: '질문',
    description: '요즘 내가 가장 많이 웃었던 이유는 뭘까?',
  },
  {
    id: 10,
    title: '질문',
    description: '너희가 나에게 고맙다고 느꼈던 순간이 있다면 언제야?',
  },
  {
    id: 11,
    title: '질문',
    description: '우리의 우정을 한마디로 표현한다면 뭐라고 말할래?',
  },
  {
    id: 12,
    title: '질문',
    description: '내가 가장 잘하는 점은 뭐라고 생각해?',
  },
  {
    id: 13,
    title: '질문',
    description: '내가 바뀌어서 너희가 놀랐던 점이 있다면?',
  },
]

const randomMockData = [
  {
    id: 1,
    description: '내 첫인상 어땠어?',
  },

  {
    id: 2,
    description: '기억에 남는 나와의 에피소드는?',
  },

  {
    id: 3,
    description: '나랑 친구하는 이유가 뭐야?',
  },

  {
    id: 4,
    description: '내 장점 알려줘!',
  },

  {
    id: 5,
    description: '나한테 서운한 적 있어?',
  },
]

interface ScrollHomeProps {
  userId: number
  visibleRef: LegacyRef<HTMLDivElement> | undefined
  scrollElement: HTMLElement | null
  setScrollElementState: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >
  currentStep: number
  questionListRef: React.RefObject<HTMLDivElement>
}

export default function ScrollHome({
  userId,
  visibleRef,
  scrollElement,
  setScrollElementState,
  currentStep,
  questionListRef,
}: ScrollHomeProps) {
  React.useEffect(() => {
    setScrollElementState(scrollElement)
  }, [scrollElement])

  React.useEffect(() => {
    if (!questionListRef.current) {
      console.warn('Refs are not initialized yet.')
    }
  }, [])

  console.log('currentStep', currentStep)

  return (
    <div className='w-full h-full flex flex-col overflow-auto'>
      <div className='flex-grow w-full overflow-y-auto scrollbar-hide'>
        {/* 썸네일 */}
        <div>
          <div ref={visibleRef} className='w-full relative'>
            <Image
              className='w-full'
              src='/home_banner_normal.svg'
              alt='bg img'
              width={100}
              height={100}
            />
            {/* 배너 */}
            <QuestionBanner randomMockData={randomMockData} />
          </div>
        </div>

        <div className='flex flex-col mt-[52px] pb-[90px]'>
          {/* 질문 리스트  */}
          <QuestionListHeader
            ref={questionListRef}
            className={`${currentStep === 1 ? 'sticky mb-[-8px] top-[50px] left-0 w-full z-10' : ''}`}
          />
          <QuestionsList questionData={mockData} isHome userId={userId} />
        </div>
      </div>
    </div>
  )
}
