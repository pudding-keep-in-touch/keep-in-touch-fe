interface HomeHeaderProps {
  isVisible: boolean
}

export const HomeHeader = ({ isVisible }: HomeHeaderProps) => {
  return (
    <header
      className={`flex justify-between items-center w-full h-[60px] px-[19px] z-10 ${isVisible ? 'bg-transparent' : 'bg-white'}`}
    >
      <div />
      <img className='translate-x-1' src='/header_title.svg' />
      <button>
        <img src='/header_more.svg' />
      </button>
    </header>
  )
}
