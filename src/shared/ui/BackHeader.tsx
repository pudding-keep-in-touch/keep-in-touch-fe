import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BackHeaderProps {
  title: string
}

export const BackHeader = ({ title }: BackHeaderProps) => {
  const router = useRouter()

  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <header className='flex-grow flex justify-between items-center w-full h-[60px] px-[19px] bg-white'>
        <ChevronLeftIcon
          className='w-6 h-6 cursor-pointer'
          onClick={() => router.back()}
        />

        <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
          {title}
        </h1>

        {/* {!pathname.endsWith('/preview') && (
          <h1 className='text-lg font-semibold text-center text-[#333D4B]'>
            {`To. ${params.userId}에게`}
          </h1>
        )} */}
        <div className='w-6' />
      </header>
    </div>
  )
}
