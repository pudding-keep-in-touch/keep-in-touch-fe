import MainLayout from '@/shared/ui/layouts/MainLayout'
import Image from 'next/image'
import GoogleButton from './_components/googleButton'

export default function Login() {
  return (
    <MainLayout>
      <div className='relative min-h-screen w-[100%]'>
        <Image
          src='/mainTitle.svg'
          alt='main title'
          width={200}
          height={200}
          className='absolute top-40 left-12'
        />

        <div className='absolute bottom-0 px-6 pb-6 w-full h-fit flex gap-2'>
          <GoogleButton />
        </div>
      </div>
    </MainLayout>
  )
}
