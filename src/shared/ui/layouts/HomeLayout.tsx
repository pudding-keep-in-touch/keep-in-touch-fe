'use client'

import React from 'react'

interface HomeLayoutProps {
  children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className='w-full min-h-screen flex items-center pb-16 px-6 bg-cover bg-center bg-home'>
      {children}
    </div>
  )
}
