import React from 'react'

type UseIsVisibleReturnType = [(node: HTMLElement | null) => void, boolean]

interface UseIsVisibleProps {
  options: {
    threshold: number
    rootMargin: string
  }
  initialState: boolean
}

const useIsVisible = (props: UseIsVisibleProps): UseIsVisibleReturnType => {
  const { options, initialState } = props
  const [visibleRef, setVisibleRef] = React.useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = React.useState(initialState)

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting) // 관찰 중이면 true 관찰 중이 아니면 false
    }, options)

    if (visibleRef) {
      // 관찰 대상이 있을 때만 실행하도록 처리
      observer.observe(visibleRef)
    }

    // clean up fn
    return () => {
      if (visibleRef) observer.unobserve(visibleRef)
    }
  }, [visibleRef, options])

  const setRefCallback = (node: HTMLElement | null) => {
    setVisibleRef(node)
  }

  return [setRefCallback, isVisible]
}

export default useIsVisible
