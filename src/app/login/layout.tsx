'use client'

import React from 'react'
import splashJson from '@/features/main/lottie/splash.json'
import Lottie from 'lottie-react'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const [step, setStep] = React.useState<number>(1)

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className='relative w-full min-h-screen bg-gradient-to-b from-[#BFE5FF] to-[#34B5FE] via-[#BFE5FF] via-50%'>
            <div className='flex flex-col w-full min-h-screen'>
              <div className='flex-1 bg-[#BFE5FF]' />
              <Lottie
                className='lottie-player'
                animationData={splashJson}
                loop={0}
              />
              <div className='flex-1 bg-[#34B5FE]' />
            </div>
          </div>
        )

      case 2:
        return (
          <div className='w-full min-h-screen flex flex-col items-center bg-white box-border'>
            {children}
          </div>
        )
    }
  }

  React.useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2000)
      // 클린업 함수
      return () => clearTimeout(timer)
    }
  }, [step])

  return <>{renderStep(step)}</>
}
