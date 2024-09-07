import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '@/shared/ui/layouts/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      Keep In Touch
      <Image src='/main.svg' alt='main' width={600} height={400} />
      <div>회원가입</div>
      <Link href='/login'>로그인</Link>
    </MainLayout>
  )
}
