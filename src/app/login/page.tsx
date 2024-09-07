import LoginForm from '@/features/auth/components/LoginForm'
import MainLayout from '@/shared/ui/layouts/MainLayout'

export default function Login() {
  return (
    <MainLayout>
      <h1>Login</h1>
      <LoginForm />
    </MainLayout>
  )
}
