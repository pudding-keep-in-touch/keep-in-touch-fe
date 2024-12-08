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
          <div className='w-full min-h-screen flex flex-col items-center bg-white border-l border-r border-[#D0E4FF] box-border'>
            <Lottie
              className='lottie-player'
              animationData={splashJson}
              loop={0}
            />
          </div>
        )

      case 2:
        return (
          <div className='w-full min-h-screen flex flex-col items-center bg-white border-l border-r border-[#D0E4FF] box-border'>
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

  console.log('step', step)

  return <>{renderStep(step)}</>
}
