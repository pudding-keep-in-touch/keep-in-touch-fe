import { HomeHeader } from '@/shared/components/homeHeader'
import { Nav } from '@/shared/components/nav'
import Image from 'next/image'
import React from 'react'
import toast from 'react-hot-toast'

interface QuestionLayoutProps {
  userId: string
  isHome: boolean
  isVisible: boolean
  children: React.ReactNode
}

export const QuestionLayout = ({
  userId,
  isHome,
  isVisible,
  children,
}: QuestionLayoutProps) => {
  const hasCopied = React.useRef(false) // 플래그로 중복 방지
  const copyLink =
    typeof window !== 'undefined' ? localStorage.getItem('link_copy') : null

  React.useEffect(() => {
    if (copyLink && !hasCopied.current) {
      toast(
        <div className='w-full flex items-center space-x-3 relative justify-center'>
          <Image
            src='/icon-check-fill.svg'
            alt='check icon fill'
            className='w-5 h-5'
            width={20}
            height={20}
          />
          <p>링크가 복사되었습니다.</p>
        </div>
      )
      localStorage.removeItem('link_copy') // 바로 삭제
      hasCopied.current = true // 실행 플래그 설정
    }
  }, [copyLink])

  return (
    <div className='relative w-full h-screen-safe z-0 bg-light-background pb-safe-bottom'>
      <HomeHeader isVisible={isVisible} isHome={isHome} /> {/* 네비게이션 바 */}
      {children}
      <Nav type='home' userId={userId} isNew={false} />
    </div>
  )
}
