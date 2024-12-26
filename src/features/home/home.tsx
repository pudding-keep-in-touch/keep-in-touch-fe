'use client'

import useIsVisible from '@/shared/hooks/useIsVisible'
import React from 'react'
import { HomeHeader } from '@/shared/components/homeHeader'

import { useHomeScrollToTopStep } from '@/shared/hooks/useScrollToTop'
import ScrollHome from '@/features/home/ui/scrollHome'
import { ScrollLayout } from '@/shared/ui/layouts/ScrollLayout'
import { useGetQuestionList } from './api/api'
import { useRouter } from 'next/navigation'

interface HomeProps {
  userId: string
}

export default function Home({ userId }: HomeProps) {
  const router = useRouter()
  const hasAlerted = React.useRef(false)
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

  React.useEffect(() => {
    const id = localStorage.getItem('keep_in_touch_user_id')
    if (userId === id || hasAlerted.current === true) return

    if (userId !== id) {
      hasAlerted.current = true // 알림 표시 상태 설정
      alert('타인의 home에는 접근 불가능합니다.')
      router.replace(`/home/${id}`) // 메인 페이지로 리다이렉트
    }
  }, [userId, router])

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
