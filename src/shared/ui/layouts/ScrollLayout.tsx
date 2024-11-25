import { ScrollToTopButton } from '@/features/home/ui/scrollToTopButton'
import { Nav } from '@/shared/components/nav'
import { HomeScrollToTopStep } from '@/shared/hooks/useScrollToTop'
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
        <div className='absolute top-0 left-0 w-full'>
          {typeof children === 'function'
            ? children({ scrollElement })
            : children}
        </div>
      </div>
      <ScrollToTopButton
        onClickToTop={onClickToTop}
        stepRefsInitialized={stepRefsInitialized}
      />
      <Nav />
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
