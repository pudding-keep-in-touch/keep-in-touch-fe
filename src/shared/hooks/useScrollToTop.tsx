import React from 'react'

export const HomeScrollToTopStep = {
  QUESTIONLIST: 'QUESTIONLIST',
} as const

export type HomeScrollToTopStep =
  (typeof HomeScrollToTopStep)[keyof typeof HomeScrollToTopStep]

interface useHomeScrollToTopStepProps {
  scrollElement?: HTMLElement | null
  topOffset: number
}

export const useHomeScrollToTopStep = ({
  scrollElement,
  topOffset,
}: useHomeScrollToTopStepProps) => {
  const questionListRef = React.useRef<HTMLDivElement>(null)

  const [currentStep, setCurrentStep] = React.useState(0)

  const stepRefs = React.useMemo(
    () => ({
      [HomeScrollToTopStep.QUESTIONLIST]: questionListRef,
    }),
    []
  )

  const stepRefsInitialized = React.useMemo(() => {
    return !!questionListRef.current && !!scrollElement
  }, [questionListRef.current, scrollElement])

  const scrollEvent = React.useCallback(() => {
    if (!scrollElement) {
      console.warn('scrollElement is not set. Skipping scroll event.')
      return
    }

    const questionListOffset =
      stepRefs[HomeScrollToTopStep.QUESTIONLIST]?.current?.offsetTop || 0

    const scrollTop = scrollElement.scrollTop

    // 스크롤이 최상단일 때
    if (scrollTop === 0) {
      if (currentStep !== 0) {
        setCurrentStep(0)
      }
      return
    }

    // `QUESTIONLIST` 영역이 최상단에 위치한 경우
    if (Math.abs(scrollTop - questionListOffset) <= 1) {
      if (currentStep !== 1) {
        setCurrentStep(1)
      }
      return
    }

    // `QUESTIONLIST`보다 위에 있을 때
    if (scrollTop + topOffset < questionListOffset) {
      if (currentStep !== 0) {
        setCurrentStep(0)
      }
    } else {
      // `QUESTIONLIST` 아래에 있을 때
      if (currentStep !== 1) {
        setCurrentStep(1)
      }
    }
  }, [scrollElement, stepRefs, topOffset, currentStep])

  const onClickToTop = React.useCallback(() => {
    if (!scrollElement) {
      console.error('scrollElement is null.')
      return
    }

    const questionListOffset =
      stepRefs[HomeScrollToTopStep.QUESTIONLIST]?.current?.offsetTop || 0
    const scrollTop = scrollElement.scrollTop

    if (currentStep === 0) {
      scrollElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      return
    }

    if (scrollTop > questionListOffset) {
      scrollElement.scrollTo({
        top: questionListOffset - topOffset,
        behavior: 'smooth',
      })
      return
    }

    if (currentStep === 1) {
      scrollElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      setCurrentStep(0)
    }
  }, [currentStep, scrollElement, stepRefs, topOffset])

  React.useEffect(() => {
    if (!scrollElement || !stepRefsInitialized) {
      console.warn(
        'Skipping scroll event registration due to uninitialized refs.'
      )
      return
    }

    const handleScrollEvent = () => {
      const questionListOffset = questionListRef.current?.offsetTop || 0
      const scrollTop = scrollElement?.scrollTop || 0

      console.log('ScrollEvent triggered.')

      // currentStep 업데이트 로직
      if (scrollTop + topOffset < questionListOffset) {
        setCurrentStep(0)
      } else {
        setCurrentStep(1)
      }

      // 추가적인 로직이 필요하면 여기에 작성 가능
      scrollEvent?.()
    }

    scrollElement.addEventListener('scroll', handleScrollEvent)

    return () => {
      console.log('Removing scroll event listener.')
      scrollElement.removeEventListener('scroll', handleScrollEvent)
    }
  }, [scrollElement, stepRefsInitialized, topOffset, scrollEvent])

  React.useEffect(() => {
    if (!scrollElement) {
      console.warn(
        'scrollElement is not set yet. Skipping scroll event registration.'
      )
      return
    }

    const handleScrollEvent = () => {
      scrollEvent() // scrollEvent 내부에서 로그 찍힘 여부 확인
    }

    scrollElement.addEventListener('scroll', handleScrollEvent)

    return () => {
      scrollElement.removeEventListener('scroll', handleScrollEvent)
    }
  }, [scrollElement, scrollEvent])

  return {
    currentStep,

    questionListRef,
    onClickToTop,
    stepRefsInitialized,
  }
}
