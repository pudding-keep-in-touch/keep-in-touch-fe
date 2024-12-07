import AuthProvider from '@/features/auth/context/AuthProvider'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>
}
