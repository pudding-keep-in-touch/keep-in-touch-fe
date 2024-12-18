import Image from 'next/image'

interface ScrollToTopButtonProps {
  onClickToTop: () => void
  stepRefsInitialized: boolean
}

export const ScrollToTopButton = ({
  onClickToTop,
  stepRefsInitialized,
}: ScrollToTopButtonProps) => {
  const handleButtonClick = () => {
    if (!stepRefsInitialized) {
      console.warn('Refs or scrollElement are not initialized. Ignoring click.')
      return
    }
    onClickToTop()
  }
  return (
    <div className='sticky flex justify-center items-start bottom-[100px] left-0 w-full p-[16px] pt-0'>
      <div className='flex items-center justify-end w-full h-full'>
        <div className='bottom-[40px] h-[50px] w-[50px] no-underline'>
          <button
            className={`flex flex-col justify-center items-center gap-1 w-full h-[50px] border-none rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.15)] bg-[#6B7684] leading-[22px] ${
              stepRefsInitialized
                ? 'cursor-pointer'
                : 'cursor-not-allowed opacity-50'
            }}`}
            disabled={!stepRefsInitialized}
            onClick={handleButtonClick}
          >
            <Image
              className='w-[10px]'
              src='/chevron-right.svg'
              alt='scroll to top arrow'
              width={0}
              height={0}
            />
            <p className='font-semibold text-[9.21px] leading-[130%] tracking-[-1.5%] text-[#D0E4FF]'>
              TOP
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
