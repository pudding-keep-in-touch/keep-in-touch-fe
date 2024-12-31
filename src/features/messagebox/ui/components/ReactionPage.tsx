'use client'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { Button } from '@/shared/components/Button'
import { EmojiProps } from '@/features/messagebox/_detail/model/messagebox.types'
import {
  useGetEmoji,
  usePostEmoji,
} from '@/features/messagebox/_detail/api/detailQuery'
import EmojiSection from '@/features/messagebox/ui/components/EmojiSection'
import { Spinner } from '@/shared/components/Spinner'
import { useBackHandler } from '@/features/messagebox/hooks/useBackHandler'

interface ReactionPageProps {
  userId: string
  messageId: string
}
const ReactionPage = React.memo(({ userId, messageId }: ReactionPageProps) => {
  const lists = ['감사', '사과', '응원', '화해']
  const backHandler = useBackHandler({ userId, type: 'received', messageId })
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set())
  const { data, isLoading } = useGetEmoji() as {
    data: EmojiProps[] | undefined
    isLoading: boolean
  }
  const { mutateAsync } = usePostEmoji()

  const storedData = (templateId: string): Set<string> => {
    setToastVisible(false)
    setSelectedSet((prevSet) => {
      const newSet = new Set(prevSet)

      if (newSet.has(templateId)) {
        newSet.delete(templateId)
      } else {
        if (newSet.size < 5) {
          newSet.add(templateId)
        } else {
          setToastVisible(true)
        }
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
      toast('반응 보내기가 완료되었습니다.', {
        style: {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        },
      })
      backHandler()
      if (!response) {
        console.error('Post Emoji Response is empty: ', response)
        backHandler()
      }
    } catch (error) {
      console.error('쪽지 보내기에 실패했습니다. : ', error)
      backHandler()
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
          paddingLeft: '3.8rem',
          paddingRight: '3.2rem',
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
  return (
    <div className='w-full h-full '>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='w-full h-full h-815:pb-[8rem] overflow-y-scroll h-815:scrollbar-hide'>
          <div className='h-815:mb-[50px]'>
            <div className='overflow-y-scroll scrollbar-hide max-w-[390px] min-h-[368px] flex flex-col justify-center w-full'>
              {lists.map((type) => (
                <EmojiSection
                  key={type}
                  grouped={groupedEmoji}
                  selected={Array.from(selectedSet)}
                  onItemClick={storedData}
                  emojiType={type}
                />
              ))}
            </div>
          </div>
          <div className='fixed flex justify-center items-start bottom-0 max-w-[390px] w-full px-[24px] pb-[30px] pt-0  z-10'>
            <div className='relative flex items-center justify-center w-full h-fit '>
              <Button
                type='button'
                disabled={isLoading}
                onClick={onSubmit}
                className='h-fit p-4 bg-[#35B6FF] rounded-2xl w-full'
              >
                <div className='text-[18px] text-white font-bold '>완료</div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

ReactionPage.displayName = 'ReactionPage'
export default ReactionPage
