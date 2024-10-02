import Image from 'next/image'
import GoogleButton from './_components/googleButton'

export default function Login() {
  return (
    <>
      <div className='flex flex-col justify-center w-full h-full px-6 py-5 mt-[84px]'>
        <Image src='/mainTitle.svg' alt='main title' width={200} height={200} />
      </div>
      <div className='p-[18px] w-full h-fit flex gap-2 mt-auto'>
        <GoogleButton />
      </div>
    </>
  )
}
