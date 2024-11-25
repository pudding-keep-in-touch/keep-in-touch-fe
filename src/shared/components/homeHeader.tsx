import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HomeHeaderProps {
  isVisible: boolean
  isHome: boolean
}

export const HomeHeader = ({ isVisible, isHome }: HomeHeaderProps) => {
  const router = useRouter()

  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <header
        className={`flex-grow flex justify-between items-center w-full h-[60px] px-[19px] bg-transparent ${!isVisible && 'hidden'}`}
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
          <img
            className={`${isHome && 'translate-x-3'}`}
            src='/header_title.svg'
          />
        )}
        <button className='w-6'>
          <img src='/header_more.svg' />
        </button>
      </header>
    </div>
  )
}
