import { useState, useEffect } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(
        window.matchMedia('(max-width: 768px)').matches ||
          /iPad|iPhone|iPod/.test(navigator.userAgent) // iOS 기기 추가
      )
    }

    checkIsMobile() // 초기 실행
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}
