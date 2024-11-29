'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/utils/emotionVariety'

export default function Layout({
  children,
  modal,
}: {
  modal: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const makeBgClass = pathname.endsWith('/reaction')
    ? 'bg-[#FFFFFF]'
    : 'bg-messageDetail'
  return (
    <div
      className={cn(
        'w-full min-h-screen flex flex-col bg-cover bg-center items-center',
        makeBgClass
      )}
    >
      {children}
      {modal}
    </div>
  )
}
