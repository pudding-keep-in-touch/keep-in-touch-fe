import AuthProvider from '@/shared/provider/Auth'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    // <AuthProvider>
    <div className='w-full min-h-screen flex flex-col items-center bg-[#F7F7FC]'>
      {children}
    </div>
    // </AuthProvider>
  )
}
