'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/Button'
import { EmojiProps } from '@/features/messagebox/model/messagebox.types'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
// import ReactionList from '@/features/messagebox/ui/ReactionList'
import { useGetEmoji } from '../_detail/api/detailQuery'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image'
export default function ReactionPage({
  messageType,
  userId,
  messageId,
}: {
  messageType: MessageType
  userId: number
  messageId: number
}) {
  const lists = ['감사', '사과', '응원', '화해']
  const [selected, setSelected] = useState<string[]>([])
  const [grouped, setGrouped] = useState<
    Record<EmojiProps['type'], EmojiProps[]>
  >({})

  const router = useRouter()
  const onSubmit = () => {
    // 데이터 보내는 로직 추가
    // console.log(...selected)
    // if(success){
    //   modal open
    // "반응이 전송되었습니다!"
    // 하고 router 이동
    // 실패 시 에러 처리도 필요
    // }
    router.push(`/messagebox/${userId}/${messageType}/${messageId}`)
  }

  const { data, error, isLoading } = useGetEmoji()

  useEffect(() => {
    const groupedData: Record<EmojiProps['type'], EmojiProps[]> = lists.reduce(
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
    setGrouped(groupedData)
  }, [data])

  if (isLoading) return <div>임시 로딩중..</div>
  if (error) return <div>Error fetching emojis.</div>

  const storedData = (e: string) => {
    if (selected.includes(e)) {
      setSelected(selected.filter((v) => v !== e))
    } else if (selected.length < 5) {
      setSelected([...selected, e])
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
  }
  return (
    <div className='absolute top-0 left-0 w-full h-full pb-20 '>
      {lists.map((type) => (
        <div
          key={type}
          className='w-full flex flex-col py-[20px] border-b-[6px] border-b-gray-1 px-6'
        >
          <h2 className='text-base font-semibold tracking-[-0.75px]'>{type}</h2>
          <div className='flex w-full flex-wrap gap-2 pt-[20px]'>
            {grouped[type]?.map((item) => (
              <div
                key={item.templateId}
                onClick={() => storedData(item.templateId)}
              >
                <div className='w-full flex h-full'>
                  <div className='flex-none'>
                    <div
                      className={`${selected.includes(item.templateId) ? 'selected-emoji' : 'bg-white border-[#C5C5C5]'} 
    w-full p-[12px] h-[35px] text-[21px] rounded-[60px] flex items-center cursor-pointer 
    border-[0.5px] hover:bg-[#35B6FF] hover:bg-opacity-40 hover:border-[#35B6FF] gap-[4px]`}
                    >
                      {item.emoji}
                      <div className='w-full flex text-[15px] font-semibold leading-[68.1%] tracking-[-2%]'>
                        {item.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
