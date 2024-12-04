import AuthProvider from '@/features/auth/context/AuthProvider'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <AuthProvider>
      <div className='relative w-full min-h-screen-safe flex flex-col items-center bg-white border-l border-r border-[#D0E4FF] box-border'>
        {children}
      </div>
    </AuthProvider>
  )
}
