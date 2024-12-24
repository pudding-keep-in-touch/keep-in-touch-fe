'use client'
import React from 'react'

export default function Layout({
  children,
  modal,
}: {
  modal: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
