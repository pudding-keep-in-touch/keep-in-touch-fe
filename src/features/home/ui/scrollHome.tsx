import React, { LegacyRef } from 'react'
import { QuestionsList } from '@/features/home/ui/questionsList'
import { QuestionBanner } from '@/features/home/ui/questionBanner'
import Image from 'next/image'
import { QuestionListHeader } from '@/features/home/ui/questionListHeader'
import { QuestionData } from '@/features/home/model/home.types'
import { useCookies } from 'react-cookie'
import { API_BASE_URL } from '@/shared/config/env'
import { usePathname } from 'next/navigation'

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
  const [popupCookies, setPopupCookies] = useCookies()
  const [isPopupCheck, setIsPopupCheck] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return !!popupCookies.HOME_MODAL_EXPIRES // 브라우저 환경에서만 쿠키 확인
    }
    return true // 서버에서는 기본값 반환
  })

  const url = usePathname()

  React.useEffect(() => {
    setScrollElementState(scrollElement)
  }, [scrollElement])

  // 상-하단 툴팁 관련 쿠키 만료일 설정
  const getExpiredDate = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date
  }

  const closeModalUntilExpires = (type: string) => {
    if (!popupCookies) return

    const expires = getExpiredDate(365)
    setPopupCookies(`${type}_MODAL_EXPIRES`, true, {
      path: `${API_BASE_URL}${url}`,
      expires,
    })

    setIsPopupCheck(true) // 툴팁 닫기
  }

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

            {/* 툴팁  */}
            {typeof window !== 'undefined' && !isPopupCheck && (
              <div className='absolute left-0 bottom-0 w-full h-[100px] z-[16] flex justify-center items-center'>
                <div className='relative flex justify-center items-center w-[266px] h-[40px] bg-black rounded-3xl'>
                  <p className='text-[#F3F3F9] text-[13px] font-normal leading-[20px] tracking-[-0.1px] text-left'>
                    다양한 질문을 생성할 수 있어요!
                  </p>
                  <button
                    onClick={() => closeModalUntilExpires('HOME')}
                    className='absolute right-5'
                  >
                    <Image
                      src='/cross.svg'
                      alt='cross icon'
                      width={12}
                      height={12}
                    />
                  </button>

                  <div className='absolute right-[52%] bottom-[2px]'>
                    <svg
                      className='absolute'
                      width='16'
                      height='8'
                      viewBox='0 0 16 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8 8L0 0H16L8 8Z'
                        fill='black' /* 배경 색상 변경 가능 */
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            {/* 배너 */}
            <QuestionBanner userId={userId} randomMockData={randomMockData} />
            {/* 툴팁 */}
          </div>
        </div>
        {/* {questionData ? ( */}
        <div className='flex flex-col mt-[52px] pb-[90px] bg-[#F6F7FC]'>
          {/* 질문 리스트  */}
          <QuestionListHeader userId={userId} />
          <QuestionsList
            ref={questionListRef}
            questionData={questionData}
            isHome
            userId={userId}
          />
        </div>
        {/* ) : (
          <div className='flex flex-col mt-[52px] w-full h-[calc(100vh-7rem)] bg-[#F6F7FC]'>
            <QuestionListHeader userId={userId} />
            <div className='w-full px-[24px] flex flex-col gap-8'>
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
          </div>
        )} */}
      </div>
    </div>
  )
}
