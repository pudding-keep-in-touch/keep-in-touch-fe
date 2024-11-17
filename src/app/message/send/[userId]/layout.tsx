'use client'

import { ChevronLeftIcon } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { cn } from '@/shared/utils/emotionVariety'
import AuthProvider from '@/features/auth/context/AuthProvider'
import { MessageVariety } from '@/entities/message/utils/messageVarieties'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const router = useRouter()
  const params = useParams<{ variety: MessageVariety; userId: string }>()
  const pathname = usePathname()

  const makeBgClass = pathname.endsWith('/preview')
    ? `bg-cover bg-center ${
        params.variety === 'thanks'
          ? 'bg-thanksPreview'
          : 'bg-honestTalkPreview'
      }`
    : 'bg-[#F7F7FC]'

  return (
    <AuthProvider>
      <div
        className={cn(
          'w-full min-h-screen flex flex-col items-center pb-16 px-6',
          makeBgClass
        )}
      >
        <header className='w-full h-[50px] grid grid-cols-3 items-center z-50'>
          <ChevronLeftIcon
            className='w-6 h-6 cursor-pointer'
            onClick={() => router.back()}
          />

          {!pathname.endsWith('/preview') && (
            <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
              {`To. ${params.userId}에게`}
            </h1>
          )}
        </header>
        {children}
      </div>
    </AuthProvider>
  )
}
