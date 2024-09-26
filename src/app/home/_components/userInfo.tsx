'use client'

interface TitleBoxProps {
  nickname: string
}

export default function UserInfo({ nickname }: TitleBoxProps) {
  return (
    <div className='mt-[120px]'>
      <h1 className='text-[#333D4B] text-2xl font-bold leading-[150%]'>
        {nickname} 님, <br /> 솔직한 마음을 <br /> 전달하세요!
      </h1>
    </div>
  )
}
