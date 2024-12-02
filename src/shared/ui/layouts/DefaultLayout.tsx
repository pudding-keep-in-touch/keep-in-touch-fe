'use client'

import QueryProvider from '@/shared/provider/QueryProvider'
import React from 'react'
import { Toaster, ToasterProps } from 'react-hot-toast'

export const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  //
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

  return (
    <div
      className='max-w-[390px] w-full mr-auto ml-auto bg-white scrollbar-hide'
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
  )
}