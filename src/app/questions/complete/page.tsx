import AuthProvider from '@/features/auth/context/AuthProvider'
import CompletePage from '@/features/questions/ui/CompletePage'

export default function Page() {
  // localstorage 에 keep_in_touch_user_id 값을 userId 값으로 nickname 가져옴
  // 버튼 크기 조정
  return (
    <AuthProvider>
      <CompletePage />
    </AuthProvider>
  )
}
