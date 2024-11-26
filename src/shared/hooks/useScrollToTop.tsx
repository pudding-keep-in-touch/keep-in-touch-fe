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
  const headerRef = React.useRef<HTMLDivElement>(null)

  const [currentStep, setCurrentStep] = React.useState(0)

  const stepRefs = React.useMemo(
    () => ({
      [HomeScrollToTopStep.QUESTIONLIST]: questionListRef,
    }),
    []
  )

  const stepRefsInitialized = React.useMemo(() => {
    const questionListRefSet =
      !!stepRefs[HomeScrollToTopStep.QUESTIONLIST]?.current
    const scrollElementSet = !!scrollElement

    return questionListRefSet && scrollElementSet
  }, [stepRefs, scrollElement])

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

    // 현재 HEADER 영역이면 아무 동작도 하지 않음
    if (currentStep === 0) {
      scrollElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      return
    }

    // QUESTIONLIST 아래에 있을 경우 → QUESTIONLIST로 이동
    if (scrollTop > questionListOffset) {
      scrollElement.scrollTo({
        top: questionListOffset - topOffset,
        behavior: 'smooth',
      })
      return
    }

    // QUESTIONLIST 영역에 있을 경우 → HEADER로 이동
    if (currentStep === 1) {
      scrollElement.scrollTo({
        top: 0, // 최상단으로 이동
        behavior: 'smooth',
      })
      setCurrentStep(0)
    }
  }, [currentStep, scrollElement, stepRefs, topOffset])

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

  React.useEffect(() => {
    if (scrollElement) {
      console.log('scrollElement is ready. Registering scroll event.')
    } else {
      console.warn('scrollElement is not set. Skipping event registration.')
    }
  }, [scrollElement])

  return {
    currentStep,

    questionListRef,
    onClickToTop,
    stepRefsInitialized,
  }
}
