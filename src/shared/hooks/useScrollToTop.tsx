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

    console.log('Refs initialized:', {
      questionListRefSet,
      scrollElementSet,
    })

    return questionListRefSet && scrollElementSet
  }, [stepRefs, scrollElement])

  const scrollEvent = React.useCallback(() => {
    console.log('ScrollEvent called')
    if (!scrollElement) {
      console.warn('scrollElement is not set. Skipping scroll event.')
      return
    }

    const questionListOffset =
      stepRefs[HomeScrollToTopStep.QUESTIONLIST]?.current?.offsetTop || 0

    const scrollTop = scrollElement.scrollTop

    console.log('Scroll calculation:', {
      scrollTop,
      topOffset,
      questionListOffset,
      result: scrollTop + topOffset < questionListOffset,
    })

    // 스크롤이 최상단일 때
    if (scrollTop === 0) {
      if (currentStep !== 0) {
        console.log('현재 스크롤이 최상단입니다. HEADER로 설정.')
        setCurrentStep(0)
      }
      return
    }

    // `QUESTIONLIST` 영역이 최상단에 위치한 경우
    if (Math.abs(scrollTop - questionListOffset) <= 1) {
      if (currentStep !== 1) {
        console.log('현재 QUESTIONLIST가 최상단에 위치해 있습니다.')
        setCurrentStep(1)
      }
      return
    }

    // `QUESTIONLIST`보다 위에 있을 때
    if (scrollTop + topOffset < questionListOffset) {
      if (currentStep !== 0) {
        console.log('현재 영역은 HEADER입니다.!')
        setCurrentStep(0)
      }
    } else {
      // `QUESTIONLIST` 아래에 있을 때
      if (currentStep !== 1) {
        console.log('현재 영역은 QUESTIONLIST입니다.!')
        setCurrentStep(1)
      }
    }
  }, [scrollElement, stepRefs, topOffset, currentStep])

  const onClickToTop = React.useCallback(() => {
    console.log('버튼 클릭! 현재 Step:', currentStep)

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
      console.log('QUESTIONLIST 아래에서 QUESTIONLIST로 이동')
      scrollElement.scrollTo({
        top: questionListOffset - topOffset,
        behavior: 'smooth',
      })
      return
    }

    // QUESTIONLIST 영역에 있을 경우 → HEADER로 이동
    if (currentStep === 1) {
      console.log('QUESTIONLIST에서 HEADER로 이동')
      scrollElement.scrollTo({
        top: 0, // 최상단으로 이동
        behavior: 'smooth',
      })
      setCurrentStep(0)
    }
  }, [currentStep, scrollElement, stepRefs, topOffset])

  // React.useEffect(() => {
  //   if (!scrollElement) {
  //     console.warn(
  //       'scrollElement is not set yet. Skipping scroll event registration.'
  //     )
  //     return
  //   }

  //   const handleScrollEvent = () => {
  //     console.log('Scroll event triggered.')
  //     scrollEvent() // 실제 이벤트 핸들러 호출
  //   }

  //   console.log('Adding scroll event listener to:', scrollElement)
  //   scrollElement.addEventListener('scroll', () => {
  //     console.log('Scroll top value:', scrollElement.scrollTop)
  //   })

  //   return () => {
  //     console.log('Removing scroll event listener from:', scrollElement)
  //     scrollElement.removeEventListener('scroll', handleScrollEvent)
  //   }
  // }, [scrollElement, scrollEvent])

  React.useEffect(() => {
    if (!scrollElement) {
      console.warn(
        'scrollElement is not set yet. Skipping scroll event registration.'
      )
      return
    }

    console.log('Adding scroll event listener to:', scrollElement)

    const handleScrollEvent = () => {
      console.log('ScrollEvent called')
      scrollEvent() // scrollEvent 내부에서 로그 찍힘 여부 확인
    }

    scrollElement.addEventListener('scroll', handleScrollEvent)

    return () => {
      console.log('Removing scroll event listener from:', scrollElement)
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
