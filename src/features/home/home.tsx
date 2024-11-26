'use client'

import useIsVisible from '@/shared/hooks/useIsVisible'
import React from 'react'
import { HomeHeader } from '@/shared/components/homeHeader'

import { useHomeScrollToTopStep } from '@/shared/hooks/useScrollToTop'
import ScrollHome from '@/features/home/ui/scrollHome'
import { ScrollLayout } from '@/shared/ui/layouts/ScrollLayout'

interface HomeProps {
  userId: number
}

export default function Home({ userId }: HomeProps) {
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

  return (
    <ScrollLayout
      isVisible={isVisible}
      isHome
      userId={userId}
      header={<HomeHeader isVisible={isVisible} isHome />}
      currentStep={currentStep}
      onClickToTop={onClickToTop}
      stepRefsInitialized={stepRefsInitialized}
    >
      {({ scrollElement }) => (
        <ScrollHome
          visibleRef={visibleRef}
          userId={userId}
          scrollElement={scrollElement}
          currentStep={currentStep}
          setScrollElementState={setScrollElementState}
          questionListRef={questionListRef}
        />
      )}
    </ScrollLayout>
  )
}
