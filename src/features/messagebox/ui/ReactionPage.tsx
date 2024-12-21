'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/Button'
import { EmojiProps } from '@/features/messagebox/model/messagebox.types'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import {
  useGetEmoji,
  usePostEmoji,
} from '@/features/messagebox/_detail/api/detailQuery'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import React from 'react'
import EmojiSection from '@/features/messagebox/ui/EmojiSection'
import { Spinner } from '@/shared/components/Spinner'

interface ReactionPageProps {
  messageType: MessageType
  userId: string
  messageId: string
}
const ReactionPage = React.memo(
  ({ messageType, userId, messageId }: ReactionPageProps) => {
    const lists = ['감사', '사과', '응원', '화해']
    const router = useRouter()
    const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set())
    const { data, error, isLoading } = useGetEmoji() as {
      data: EmojiProps[] | undefined
      error: Error | null
      isLoading: boolean
    }
    const { mutateAsync } = usePostEmoji()

    const storedData = (templateId: string): Set<string> => {
      setSelectedSet((prevSet) => {
        const newSet = new Set(prevSet)

        if (newSet.has(templateId)) {
          newSet.delete(templateId)
        } else if (newSet.size < 5) {
          newSet.add(templateId)
        } else {
          setToastVisible(true)
        }

        return newSet
      })

      return selectedSet
    }

    const onSubmit = async () => {
      try {
        const templateIdsArray = Array.from(selectedSet)
        const response = await mutateAsync({
          messageId: messageId,
          templateIds: templateIdsArray,
        })

        if (response.messageId) {
          router.back()
        } else {
          console.error('Post Emoji Error, messageId가 없습니다 : ', response)
        }
      } catch (error) {
        console.error('쪽지 보내기에 실패했습니다. : ', error)
      }
    }

    const [toastVisible, setToastVisible] = useState(false)

    useEffect(() => {
      if (toastVisible) {
        toast('반응은 최대 5개 보낼 수 있어요', {
          icon: (
            <Image
              src='/toast_alert.svg'
              alt='toast_alert'
              width={18}
              height={18}
            />
          ),
          style: {
            borderRadius: '16px',
            background: '#474747',
            color: '#fff',
            width: '100%',
            height: '56px',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
        })
      } else {
        setToastVisible(false)
      }
    }, [selectedSet, toastVisible])

    const groupedEmoji: Record<EmojiProps['type'], EmojiProps[]> = lists.reduce(
      (acc, type) => {
        acc[type] = []
        return acc
      },
      {} as Record<EmojiProps['type'], EmojiProps[]>
    )

    if (data) {
      data.forEach((item) => {
        groupedEmoji[item.type].push(item)
      })
    }

    if (error) return <div>Error fetching emojis. : Error: {error.message}</div>

    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='w-full h-full h-815:pb-[100px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
            <div className='h-815:mb-[30px]'>
              <div className='overflow-y-scroll scrollbar-hide max-w-[390px] min-h-[368px] flex flex-col justify-center w-full'>
                {lists.map((type) => (
                  <EmojiSection
                    key={type}
                    messageType={messageType}
                    grouped={groupedEmoji}
                    selected={Array.from(selectedSet)}
                    onItemClick={storedData}
                    type={type}
                  />
                ))}
              </div>
            </div>
            <div className='fixed flex justify-center items-start bottom-0 max-w-[390px] w-full px-[24px] pb-[30px] pt-0  z-10'>
              <div className='relative flex items-center justify-center w-full h-fit '>
                <Button
                  type='button'
                  onClick={onSubmit}
                  className='h-fit p-4 bg-[#35B6FF] rounded-2xl w-full'
                >
                  <div className='text-[18px] text-white font-bold '>완료</div>
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
)

ReactionPage.displayName = 'ReactionPage'
export default ReactionPage
