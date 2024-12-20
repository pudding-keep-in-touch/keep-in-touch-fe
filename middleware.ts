import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('keep_in_touch_token')?.value
  const userId = request.cookies.get('keep_in_touch_user_id')?.value
  const urlId = request.nextUrl.pathname.split('/').pop() // URL에서 id 추출

  // 인증 여부 확인
  if (!token || !userId || userId !== urlId) {
    // Unauthorized로 리다이렉트
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}

// 특정 경로에서만 middleware를 작동
export const config = {
  matcher: ['/home/:userId*'], // /home/[userId]에만 적용
}
