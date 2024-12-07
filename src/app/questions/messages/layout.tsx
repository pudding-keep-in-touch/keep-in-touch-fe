'use client'

import AuthProvider from '@/features/auth/context/AuthProvider'
// import { MessageVariety } from '@/entities/message/utils/messageVarieties'
import MessageFormProvider from '@/features/message/_send/context/FormProvider'
import { useGetNickname } from '@/features/questions/hooks/query/useNicknameQuery'
import { cn } from '@/shared/utils/emotionVariety'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronLeftIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()

  // `localStorage`와 `QueryClient` 동기화
  useEffect(() => {
    const storedSelectedQuestion = localStorage.getItem('selectedQuestion')
    if (storedSelectedQuestion) {
      const parsedData = JSON.parse(storedSelectedQuestion)
      if (Object.keys(parsedData).length > 0) {
        queryClient.setQueryData(['selectedQuestion'], parsedData)
        localStorage.removeItem('selectedQuestion') // 복원 후 삭제
      }
    }
    console.log('1')
  }, [queryClient])

  console.log('2')

  // `selectedQuestion` 데이터 가져오기
  const selectedQuestion = queryClient.getQueryData<{
    questionId: string
    content: string
    userId: string
  }>(['selectedQuestion'])

  console.log('3')

  const userId = selectedQuestion?.userId

  console.log('4')

  // 닉네임 가져오기
  const { data: nickname } = useGetNickname(userId ?? '')

  const makeBgClass = pathname.endsWith('/preview')
    ? `bg-cover bg-center ${'bg-messageDetail'}`
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
            <h1 className='text-lg font-semibold text-center text-[#333D4B] whitespace-nowrap w-full'>
              {`To. ${nickname}에게`}
            </h1>
          )}
        </header>
        <MessageFormProvider>{children}</MessageFormProvider>
      </div>
    </AuthProvider>
  )
}
