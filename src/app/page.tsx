import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex flex-col min-h-screen items-center bg-gradient-to-b from-sky-100 to-sky-500'>
      Keep In Touch
      <Image src='/main.svg' alt='main' width={600} height={400} />
      <div>회원가입</div>
      <Link href='/login'>로그인</Link>
    </main>
  )
}
