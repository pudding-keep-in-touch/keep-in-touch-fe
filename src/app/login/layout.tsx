import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen items-center bg-gradient-to-b from-sky-100 to-sky-500'>
      {children}
    </div>
  )
}
