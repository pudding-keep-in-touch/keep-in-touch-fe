'use client'

import AuthProvider from '@/features/auth/context/AuthProvider'
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
  }, [queryClient])

  // `selectedQuestion` 데이터 가져오기
  const selectedQuestion = queryClient.getQueryData<{
    questionId: string
    content: string
    userId: string
  }>(['selectedQuestion'])

  const userId = selectedQuestion?.userId

  // 닉네임 가져오기
  const { data: nickname, isLoading } = useGetNickname(userId ?? '')

  const makeBgClass = pathname.endsWith('/preview')
    ? `bg-cover bg-center ${'bg-messageDetail'}`
    : 'bg-[#F7F7FC]'

  // 닉네임을 불러오는 중이거나 없는 경우 처리
  if (isLoading) {
    return null // 로딩 중에는 아무것도 렌더링하지 않음 (로딩 스피너를 추가할 수도 있음)
  }

  //todo AuthProvider 감싸기
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
              {`To. ${nickname ?? '받는 사람'}에게`}
            </h1>
          )}
        </header>
        <MessageFormProvider>{children}</MessageFormProvider>
      </div>
    </AuthProvider>
  )
}
