'use client'
import { ChevronLeftIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/shared/utils/emotionVariety'

export default function Layout({
  children,
  modal,
}: {
  modal: React.ReactNode
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const makeBgClass = pathname.endsWith('/reaction')
    ? 'bg-[#FFFFFF]'
    : 'bg-messageDetail'

  return (
    <div
      className={cn(
        'w-full min-h-screen flex flex-col bg-cover bg-center items-center pb-16 px-6',
        makeBgClass
      )}
    >
      {children}
      {modal}
    </div>
  )
}
