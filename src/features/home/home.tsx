'use client'

import useIsVisible from '@/shared/hooks/useIsVisible'
import React from 'react'
import { HomeHeader } from '@/shared/components/homeHeader'

import { useHomeScrollToTopStep } from '@/shared/hooks/useScrollToTop'
import ScrollHome from '@/features/home/ui/scrollHome'
import { ScrollLayout } from '@/shared/ui/layouts/ScrollLayout'

const mockData = [
  {
    id: 1,
    title: '질문',
    description: '나에게 하고 싶었던 말이 있다면?',
  },
  {
    id: 2,
    title: '질문',
    description: '그동안 하지 못했던 말을 해줘! 아무말이라도 써주셈요',
  },
  {
    id: 3,
    title: '질문',
    description:
      '이건 테스트인데요 아무말이나 해주면 걍 답변어쩌구 저쩌구 문장 길이를 테스트하기 위한 겁니다요',
  },
  {
    id: 4,
    title: '질문',
    description: '너희가 가장 기억하는 나의 모습은 어떤 모습일까?',
  },
  {
    id: 5,
    title: '질문',
    description: '나와 함께한 가장 즐거운 순간은 언제였어?',
  },
  {
    id: 6,
    title: '질문',
    description: '나와의 추억 중 가장 웃겼던 일은 뭐였을까?',
  },
  {
    id: 7,
    title: '질문',
    description: '내가 너희들에게 어떤 존재였는지 궁금해!',
  },
  {
    id: 8,
    title: '질문',
    description: '내가 고치면 좋겠다고 생각한 점이 있다면?',
  },
  {
    id: 9,
    title: '질문',
    description: '요즘 내가 가장 많이 웃었던 이유는 뭘까?',
  },
  {
    id: 10,
    title: '질문',
    description: '너희가 나에게 고맙다고 느꼈던 순간이 있다면 언제야?',
  },
  {
    id: 11,
    title: '질문',
    description: '우리의 우정을 한마디로 표현한다면 뭐라고 말할래?',
  },
  {
    id: 12,
    title: '질문',
    description: '내가 가장 잘하는 점은 뭐라고 생각해?',
  },
  {
    id: 13,
    title: '질문',
    description: '내가 바뀌어서 너희가 놀랐던 점이 있다면?',
  },
]

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
      questionData={undefined}
      currentStep={currentStep}
      onClickToTop={onClickToTop}
      stepRefsInitialized={stepRefsInitialized}
    >
      {({ scrollElement }) => (
        <ScrollHome
          visibleRef={visibleRef}
          userId={userId}
          scrollElement={scrollElement}
          questionData={undefined}
          currentStep={currentStep}
          setScrollElementState={setScrollElementState}
          questionListRef={questionListRef}
        />
      )}
    </ScrollLayout>
  )
}
