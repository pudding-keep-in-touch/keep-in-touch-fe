import Image from 'next/image'

interface OnBoardingStepProps {
  stepNum: number
  title: string
  description: string
  imageUrl: string
}

export const OnBoardingStep = ({
  stepNum,
  title,
  description,
  imageUrl,
}: OnBoardingStepProps) => {
  return (
    <div className='w-full h-full flex flex-col justify-start items-center mb-6'>
      <h1 className='font-medium text-gray-3 text-2xl leading-[130%] tracking-[-1px] mb-[27px]'>
        솔직한 마음을 주고 받는 방법
      </h1>

      <div className='px-[10px] py-[3px] bg-[#D9F1FF] rounded-3xl mb-[14px]'>
        <span className='text-[#0788D1] text-sm font-medium leading-[22px] tracking-[-0.43px]'>
          Step. {stepNum}
        </span>
      </div>
      <h1 className='text-[#0788D1] font-bold text-[22px] leading-[140%] tracking-[-1px] text-center mb-1'>
        {title}
      </h1>
      <p className='text-gray-4 font-normal text-[15px] tracking-[-0.75px] text-center'>
        {description}
      </p>
      <img
        className='mt-[35px] mb-7'
        src={imageUrl}
        alt='onboarding step image'
      />
    </div>
  )
}
