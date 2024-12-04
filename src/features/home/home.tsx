'use client'

import useIsVisible from '@/shared/hooks/useIsVisible'
import React from 'react'
import { HomeHeader } from '@/shared/components/homeHeader'

import { useHomeScrollToTopStep } from '@/shared/hooks/useScrollToTop'
import ScrollHome from '@/features/home/ui/scrollHome'
import { ScrollLayout } from '@/shared/ui/layouts/ScrollLayout'
import { useGetQuestionList } from './api/api'

interface HomeProps {
  userId: number
}

export default function Home({ userId }: HomeProps) {
  const [domLoaded, setDomLoaded] = React.useState(false)

  const { data } = useGetQuestionList({ userId })

  const [visibleRef, isVisible] = useIsVisible({
    options: { threshold: 0, rootMargin: '0px' },
    initialState: false,
  })

  const [scrollElementState, setScrollElementState] =
    React.useState<HTMLElement | null>(null)

  const { currentStep, questionListRef, onClickToTop, stepRefsInitialized } =
    useHomeScrollToTopStep({
      scrollElement: scrollElementState,
      topOffset: 50, // Header 높이
    })

  React.useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <>
      {domLoaded && (
        <ScrollLayout
          isVisible={isVisible}
          isHome
          userId={userId}
          header={<HomeHeader isVisible={isVisible} isHome />}
          questionData={data}
          currentStep={currentStep}
          onClickToTop={onClickToTop}
          stepRefsInitialized={stepRefsInitialized}
        >
          {({ scrollElement }) => (
            <ScrollHome
              visibleRef={visibleRef}
              userId={userId}
              scrollElement={scrollElement}
              questionData={data}
              currentStep={currentStep}
              setScrollElementState={setScrollElementState}
              questionListRef={questionListRef}
            />
          )}
        </ScrollLayout>
      )}
    </>
  )
}
