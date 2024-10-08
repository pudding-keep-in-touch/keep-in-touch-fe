import Image from 'next/image'
import MessageBoard from './_components/board'
import ReceiveDetailLayout from '@/shared/ui/layouts/ReceiveDetailLayout'

export default function Page() {
  return (
    <ReceiveDetailLayout>
      <div className='relative min-h-screen w-[100%]'>
        <Image
          src='/receiveDetailTitle.svg'
          alt='receive detail title'
          width={200}
          height={200}
          className='absolute top-20 left-1/2 transform -translate-x-1/2'
        />
        <div className='w-[32rem]'>
          <Image src='/receiveDetail.svg' alt='main' width={600} height={800} />
        </div>

        <MessageBoard />
      </div>
    </ReceiveDetailLayout>
  )
}
