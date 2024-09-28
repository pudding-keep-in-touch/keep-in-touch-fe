'use client'

import HomeLayout from '@/shared/ui/layouts/HomeLayout'
import Image from 'next/image'
import UserInfo from './_components/userInfo'
import MessagePreview from './_components/messagePreview'
import LinkShareButton from './_components/linkShareButton'
import Tooltip from './_components/tooltip'
import useCurrentMessage from './_hooks/useCurrentMessage'
export default function Home() {
  const home = useCurrentMessage(6)

  if (!home) return null

  const { isOwner, loginUser, dmList, friendUser, emotions } = home

  return (
    <HomeLayout>
      <div className='relative min-h-screen w-[100%]'>
        <div className='w-[32rem]'>
          <Image src='/home.svg' alt='home' width={600} height={800} />
        </div>

        <div className='absolute top-1 flex flex-col pt-[20px] px-6 w-[100%]'>
          <UserInfo nickname={loginUser.nickname} />

          <div className='mt-[100px] flex flex-col gap-6'>
            <MessagePreview
              title='받은 쪽지'
              type='received'
              dmList={dmList[0]}
            />
          </div>

          <Tooltip>
            <LinkShareButton />
          </Tooltip>
        </div>
      </div>
    </HomeLayout>
  )
}
