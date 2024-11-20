'use client'

import { useSearchParams } from 'next/navigation'
import { QuestionsCard } from '@/features/home/ui/questionsCard'
import { QuestionsList } from '@/features/home/ui/questionsList'
import { Nav } from '@/shared/components/nav'

import useIsVisible from '@/shared/hooks/useIsVisible'
import { HomeHeader } from '../../../shared/components/homeHeader'
import { QuestionBanner } from './questionBanner'

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

export default function Home() {
  const searchParams = useSearchParams()
  let userId: number | null = null

  const userIdFromParams = searchParams.get('userId')

  if (!userIdFromParams) {
    userId = Number(localStorage.getItem('keep_in_touch_user_id'))
  } else {
    userId = Number(userIdFromParams)
  }

  const [visibleRef, isVisible] = useIsVisible({
    options: { threshold: 0, rootMargin: '0px' },
    initialState: false,
  })

  return (
    <div className='w-full h-screen flex flex-col overflow-hidden relative '>
      <HomeHeader isVisible={isVisible} />

      <div className='w-full h-screen flex flex-col overflow-hidden absolute'>
        <div className='flex-grow w-full overflow-auto scrollbar-hide'>
          {/* 썸네일 */}
          <div className='w-full relative'>
            <img ref={visibleRef} src='/home_banner_normal.svg' alt='bg img' />
            {/* 배너 */}
            <QuestionBanner randomMockData={randomMockData} />
          </div>

          <div className='flex flex-col px-[24px] mt-[52px]'>
            {/* 전체공유하기 */}
            <div className='flex flex-col justify-start px-5 py-[18px] w-full h-[86px] bg-[#35B6FF] bg-opacity-30 rounded-2xl relative'>
              <h3 className='text-[#0788D1] text-lg font-bold leading-[1.4] tracking-tightest'>
                모든 질문 공유하기
              </h3>
              <p className='text-[#6B7684] text-[15px] font-medium leading-[1.4] tracking-tightest'>
                숨긴 질문을 제외한 모든 질문을 공유할 수 있어요!
              </p>

              <img
                src='/icon_send.svg'
                className='absolute right-4'
                alt='send icon'
              />
            </div>

            {/* 자유 질문 */}
            <QuestionsCard
              title='자유 질문'
              description={
                <div>
                  질문을 쓰지 않은 글쓰기 양식입니다. <br />
                  자유롭게 쪽지를 받을 수 있어요!
                </div>
              }
              isFreeQuestion
            />
          </div>

          {/* 질문 리스트  */}
          <div className='flex-grow w-full overflow-auto px-[24px] space-y-4 pb-[100px]'>
            <QuestionsList questionData={mockData} />
          </div>
        </div>
      </div>

      {/* 네비게이션 바 */}
      <Nav />
    </div>
  )
}
