import { HomeHeader } from '@/shared/components/homeHeader'
import { Nav } from '@/shared/components/nav'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface QuestionLayoutProps {
  userId: number
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
          <div className='absolute left-1 gap-3 flex items-center'>
            <img
              src='/icon-check-fill.svg'
              alt='check icon fill'
              className='w-5 h-5'
            />
            <p>링크가 복사되었습니다.</p>
          </div>
        </div>
      )
      localStorage.removeItem('link_copy') // 바로 삭제
      hasCopied.current = true // 실행 플래그 설정
    }
  }, [copyLink])

  return (
    <div className='w-full h-screen flex flex-col relative'>
      <HomeHeader isVisible={isVisible} isHome={isHome} /> {/* 네비게이션 바 */}
      {children}
      {/* {!isHome && <ShareButton userId={userId} />} */}
      <Toaster
        position='bottom-center'
        containerStyle={{
          bottom: '100px', // Nav 높이를 고려한 여백
        }}
        toastOptions={{
          className: '',
          style: {
            width: '100%',
            height: '56px',
            backgroundColor: '#474747',
            color: 'white',
            borderRadius: 16,
          },
        }}
      />
      <Nav />
    </div>
  )
}
