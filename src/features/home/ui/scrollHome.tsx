import React, { LegacyRef } from 'react'
import { QuestionsList } from '@/features/home/ui/questionsList'
import { QuestionBanner } from '@/features/home/ui/questionBanner'
import Image from 'next/image'
import { QuestionListHeader } from '@/features/home/ui/questionListHeader'
import { TypeQuestionCard } from './typeQuestionCard'
import { QuestionData } from '@/features/home/model/home.types'

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
  questionData: QuestionData[] | undefined
  currentStep: number
  questionListRef: React.RefObject<HTMLDivElement>
}

export default function ScrollHome({
  userId,
  visibleRef,
  scrollElement,
  setScrollElementState,
  questionData,
  currentStep,
  questionListRef,
}: ScrollHomeProps) {
  React.useEffect(() => {
    setScrollElementState(scrollElement)
  }, [scrollElement])

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
        {questionData ? (
          <div className='flex flex-col mt-[52px] pb-[90px] bg-[#F6F7FC]'>
            {/* 질문 리스트  */}
            <QuestionListHeader />
            <QuestionsList
              ref={questionListRef}
              questionData={questionData}
              isHome
              userId={userId}
            />
          </div>
        ) : (
          <div className='flex flex-col mt-[52px] w-full h-[calc(100vh-7rem)] bg-[#F6F7FC] gap-8'>
            <TypeQuestionCard userId={userId} isHome={true} />
            <div className='w-full h-[100px] flex justify-center items-center'>
              <Image
                src='/emptyData.svg'
                alt='empty data'
                width={165}
                height={92}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
