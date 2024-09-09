import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/shared/ui/layouts/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      <div className='relative w-[32rem]'>
        <Image
          src='/mainTitle.svg'
          alt='main title'
          width={200}
          height={200}
          className='absolute top-40 left-12'
        />
        <Image src='/main.svg' alt='main' width={600} height={800} />
      </div>
      <div>회원가입</div>
      <Link href='/login'>로그인</Link>
    </MainLayout>
  )
}
