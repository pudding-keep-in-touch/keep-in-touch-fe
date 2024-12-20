'use client'

import QueryProvider from '@/shared/provider/QueryProvider'
import React from 'react'
import toast, { Toaster, useToasterStore } from 'react-hot-toast'
import Snowfall from 'react-snowfall'

export const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { toasts } = useToasterStore()
  const [toastLimit] = React.useState<number>(3) // 3개의 토스트만 허용

  React.useEffect(() => {
    let vh = 0
    const setVh = () => {
      vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    }

    setVh()

    window.addEventListener('resize', setVh)
    return () => {
      window.removeEventListener('resize', setVh)
    }
  }, [])

  React.useEffect(() => {
    // 보이는 토스트 필터링
    const visibleToasts = toasts.filter((t) => t.visible)

    // 초과된 토스트 제거
    if (visibleToasts.length > toastLimit) {
      visibleToasts
        .slice(toastLimit) // 초과된 부분만 선택
        .forEach((t) => toast.dismiss(t.id)) // 초과된 토스트 제거
    }
  }, [toasts, toastLimit])

  return (
    <>
      <div
        className='max-w-[390px] w-420:max-w-full w-full mr-auto ml-auto bg-white scrollbar-hide border-l border-r border-[#D0E4FF] box-border w-420:border-none'
        style={{
          height: 'calc(var(--vh, 1vh) * 100)', // Safari에서 안전한 높이 사용
          overflow: 'hidden', // 레이아웃 확장 방지
        }}
      >
        <QueryProvider>{children}</QueryProvider>
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
      </div>

      <div
        style={{
          position: 'fixed', // 화면에 고정
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // 배경으로 이동
          pointerEvents: 'none', // Snowfall과의 상호작용 방지
        }}
      >
        <Snowfall color='#dee4fd' snowflakeCount={100} />
      </div>
    </>
  )
}
