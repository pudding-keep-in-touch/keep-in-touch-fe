import { QuestionData } from '@/features/home/model/home.types'
import { QuestionListHeader } from '@/features/home/ui/questionListHeader'
import { ScrollToTopButton } from '@/features/home/ui/scrollToTopButton'
import { Nav } from '@/shared/components/nav'
import React from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
interface ScrollLayoutProps {
  userId: string
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
  const hasCopied = React.useRef(false)

  React.useEffect(() => {
    const copyLink =
      typeof window !== 'undefined' ? localStorage.getItem('link_copy') : null

    if (copyLink && !hasCopied.current) {
      toast(
        <div className='w-full flex items-center space-x-3 relative justify-center'>
          <Image
            src='/icon-check-fill.svg'
            alt='check icon fill'
            className='w-5 h-5'
            width={20}
            height={20}
          />
          <p>링크가 복사되었습니다.</p>
        </div>
      )

      localStorage.removeItem('link_copy')
      hasCopied.current = true
    }
  }, [])

  return (
    <div className='relative w-full h-screen-safe z-0 bg-light-background pb-safe-bottom'>
      {header}
      {/* StyledLayout */}
      <div
        ref={(el) => {
          if (el && scrollElement !== el) {
            setScrollElement(el)
          }
        }}
        className='relative w-full h-full overflow-y-scroll scrollbar-hide'
      >
        {/* 질문 리스트 헤더  */}
        {questionData !== undefined && currentStep === 1 && (
          <QuestionListHeader
            userId={userId}
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

      <Nav type='home' userId={userId} />
    </div>
  )
}
