import React from 'react'
import { MainLayoutProps } from '@/shared/types/common.types'

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen items-center'>{children}</div>
  )
}
