import HomeLayout from '@/shared/ui/layouts/HomeLayout'
import Image from 'next/image'
import UserInfo from './_components/userInfo'
import MessagePreview from './_components/messagePreview'
import LinkShareButton from './_components/linkShareButton'
import Tooltip from './_components/tooltip'
import { DmList } from '@/entities/message/model/types'

export default function Home() {
  const mockData: DmList[] = [
    {
      id: 1,
      senderId: 10,
      content: '안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
      emotion: {
        name: '응원과감사',
        emoji: '/supportEmotion.svg',
      },
      isRead: false,
      createdAt: '2024-09-02',
    },
    {
      id: 2,
      senderId: 32,
      content:
        '두번째 안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
      emotion: {
        name: '솔직한대화',
        emoji: '/honestEmotion.svg',
      },
      isRead: false,
      createdAt: '2024-09-02',
    },
  ]

  const testName = '홍길동'

  return (
    <HomeLayout>
      <div className='relative min-h-screen w-[100%]'>
        <div className='w-[32rem]'>
          <Image src='/home.svg' alt='home' width={600} height={800} />
        </div>

        <div className='absolute top-1 flex flex-col pt-[20px] px-6 w-[100%]'>
          <UserInfo nickname={testName} />

          <div className='mt-[100px] flex flex-col gap-6'>
            <MessagePreview
              dmList={mockData[0]}
              title='보낸 쪽지'
              type='send'
            />
            <MessagePreview title='받은 쪽지' type='received' />
          </div>

          <Tooltip>
            <LinkShareButton />
          </Tooltip>
        </div>
      </div>
    </HomeLayout>
  )
}
