'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/Button'
import { EmojiProps } from '@/features/messagebox/model/messagebox.types'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import { useGetEmoji } from '@/features/messagebox/_detail/api/detailQuery'
import { useCallback, useMemo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image'
import React from 'react'
import EmojiSection from '@/features/messagebox/ui/EmojiSection'

interface ReactionPageProps {
  messageType: MessageType
  userId: number
  messageId: number
}

const ReactionPage = React.memo(
  ({ messageType, userId, messageId }: ReactionPageProps) => {
    const lists = ['감사', '사과', '응원', '화해']
    const router = useRouter()
    const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set())
    const { data, error, isLoading } = useGetEmoji()
    const onSubmit = () => {
      router.push(`/messagebox/${userId}/${messageType}/${messageId}`)
    }
    const storedData = useCallback((templateId: string) => {
      setSelectedSet((prevSet) => {
        const newSet = new Set(prevSet)
        console.log(newSet.size)
        if (newSet.has(templateId)) {
          newSet.delete(templateId)
        } else if (newSet.size < 5) {
          newSet.add(templateId)
        } else {
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
        }
        return newSet
      })
    }, [])
    const grouped = useMemo(() => {
      const groupedData: Record<EmojiProps['type'], EmojiProps[]> =
        lists.reduce(
          (acc, type) => {
            acc[type] = []
            return acc
          },
          {} as Record<EmojiProps['type'], EmojiProps[]>
        )

      if (data) {
        data.forEach((item) => {
          if (groupedData[item.type]) {
            groupedData[item.type].push(item)
          }
        })
      }
      return groupedData
    }, [data])

    if (isLoading) return <div>임시 로딩중..</div>
    if (error) return <div>Error fetching emojis.</div>
    return (
      <div className='absolute top-0 left-0 w-full h-full pb-20 '>
        {lists.map((type) => (
          <EmojiSection
            key={type}
            messageType={messageType}
            grouped={grouped}
            selected={Array.from(selectedSet)}
            onItemClick={storedData}
            type={type}
          />
        ))}
        <div className='fixed flex w-full max-w-[390px] justify-center items-center bottom-0 pb-[10px] z-10 px-6'>
          <Toaster position='bottom-center' reverseOrder={false} />
          <div className='relative flex items-center justify-center mt-[46px] w-full h-fit '>
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
    )
  }
)

ReactionPage.displayName = 'ReactionPage'
export default ReactionPage
