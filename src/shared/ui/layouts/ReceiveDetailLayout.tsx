import React from 'react'
import { MainLayoutProps } from '@/shared/types'

export default function ReceiveDetailLayout({ children }: MainLayoutProps) {
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-sky-100 to-sky-500'>
      {children}
    </div>
  )
}
