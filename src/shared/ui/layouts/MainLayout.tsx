import React from 'react'
import { MainLayoutProps } from '@/shared/types'

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen items-center bg-gradient-to-b from-sky-100 to-sky-500'>
      {children}
    </div>
  )
}
