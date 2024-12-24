import { Suspense } from 'react'
import QuestionListPage from '@/features/questions/ui/QuestionListPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading questions...</div>}>
      <QuestionListPage />
    </Suspense>
  )
}
