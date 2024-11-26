import { QuestionData } from '@/features/home/model/home.types'
import { QuestionListHeader } from '@/features/home/ui/questionListHeader'
import { ScrollToTopButton } from '@/features/home/ui/scrollToTopButton'
import { Nav } from '@/shared/components/nav'
import React from 'react'
import { Toaster } from 'react-hot-toast'

interface ScrollLayoutProps {
  userId: number
  isHome: boolean
  isVisible: boolean
  header: React.ReactNode
  children:
    | ((props: { scrollElement: HTMLElement | null }) => React.ReactNode)
    | React.ReactNode

  questionData: QuestionData[] | undefined
  currentStep: number
  onClickToTop: () => void
  stepRefsInitialized: boolean
}

export const ScrollLayout = ({
  userId,
  isHome,
  isVisible,
  header,
  children,
  questionData,
  currentStep,
  onClickToTop,
  stepRefsInitialized,
}: ScrollLayoutProps) => {
  const [scrollElement, setScrollElement] =
    React.useState<HTMLDivElement | null>(null)

  return (
    <div className='relative w-full h-full flex flex-col'>
      {header}

      <div
        ref={(el) => {
          setScrollElement(el)
          console.log('scrollElement set to:', el)
        }}
        className='relative flex flex-col w-full h-screen overflow-y-scroll scrollbar-hide'
      >
        {/* 질문 리스트 헤더  */}
        {questionData !== undefined && currentStep === 1 && (
          <QuestionListHeader
            className={`sticky mb-[-8px] top-0 left-0 w-full z-10 shadow-custom-bottom transition-shadow duration-300 ease-in-out`}
          />
        )}
        <div className='absolute top-0 left-0 w-full'>
          {typeof children === 'function'
            ? children({ scrollElement })
            : children}
        </div>
      </div>

      {questionData !== undefined && currentStep === 1 && (
        <ScrollToTopButton
          onClickToTop={onClickToTop}
          stepRefsInitialized={stepRefsInitialized}
        />
      )}

      <Nav type='home' userId={userId} isNew={true} />
      <Toaster
        position='bottom-center'
        containerStyle={{
          bottom: '100px', // Nav 높이를 고려한 여백
        }}
        toastOptions={{
          className: '',
          style: {
            width: '100%',
            height: '56px',
            backgroundColor: '#474747',
            color: 'white',
            borderRadius: 16,
          },
        }}
      />
    </div>
  )
}
