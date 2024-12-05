'use client'

// import { MessageVariety } from '@/entities/message/utils/messageVarieties'
import MessageFormProvider from '@/features/message/_send/context/FormProvider'
import { useGetNickname } from '@/features/questions/hooks/query/useNicknameQuery'
import { cn } from '@/shared/utils/emotionVariety'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronLeftIcon } from 'lucide-react'
// import { useParams, usePathname, useRouter } from 'next/navigation'
import { useParams, usePathname, useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()
  //todo nickname 추가, 현재 임시값
  // const params = useParams<{ nickname: string }>()
  // const nickname = 'test'

  const pathname = usePathname()

  const selectedQuestion = queryClient.getQueryData<{
    questionId: string
    content: string
    userId: string
  }>(['selectedQuestion'])

  const userId = selectedQuestion?.userId

  const { data: nickname } = useGetNickname(userId ?? '')

  const makeBgClass = pathname.endsWith('/preview')
    ? `bg-cover bg-center ${'bg-messageDetail'}`
    : 'bg-[#F7F7FC]'

  return (
    <>
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
    </>
  )
}
