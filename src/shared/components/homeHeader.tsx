interface HomeHeaderProps {
  isVisible: boolean
}

export const HomeHeader = ({ isVisible }: HomeHeaderProps) => {
  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <header
        className={`flex-grow flex justify-between items-center w-full h-[60px] px-[19px] ${isVisible ? 'bg-transparent' : 'bg-white'}`}
      >
        <div />
        <img className='translate-x-1' src='/header_title.svg' />
        <button>
          <img src='/header_more.svg' />
        </button>
      </header>
    </div>
  )
}
