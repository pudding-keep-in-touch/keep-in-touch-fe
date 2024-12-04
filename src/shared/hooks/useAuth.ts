// 유틸리티 함수: 로그인 상태를 확인
export function isUserLoggedIn(): boolean {
  // 예시: 로그인 상태를 localStorage 또는 쿠키에서 확인
  const token = localStorage.getItem('authToken') // 또는 쿠키를 사용
  return !!token // 토큰이 있으면 로그인 상태로 판단
}