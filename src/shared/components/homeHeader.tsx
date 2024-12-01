import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface HomeHeaderProps {
  isVisible: boolean
  isHome: boolean
}

export const HomeHeader = ({ isVisible, isHome }: HomeHeaderProps) => {
  const router = useRouter()

  return (
    <div
      className={`absolute top-0 left-0 w-full z-10 ${isHome && !isVisible ? 'hidden' : ''}`}
    >
      <header
        className={`flex-grow flex justify-between items-center w-full h-[60px] px-[19px] ${isHome ? 'bg-transparent' : 'bg-white'}`}
      >
        {isHome ? (
          <div />
        ) : (
          <ChevronLeftIcon
            className='w-6 h-6 cursor-pointer'
            onClick={() => router.back()}
          />
        )}
        {isHome && (
          <Image
            className={`${isHome && 'translate-x-3'} max-w-[142px] max-h-[20.84px] w-full`}
            alt='logo icon'
            src='/header_title.svg'
            width={0}
            height={0}
          />
        )}
        {/* <button className='w-6'> */}
        <Image
          className='max-w-[6px] w-full h-[22px]'
          src='/header_more.svg'
          width={0}
          height={0}
          alt='more icon'
        />
        {/* </button> */}
      </header>
    </div>
  )
}
