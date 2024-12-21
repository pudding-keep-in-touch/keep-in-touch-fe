// 쿠키 설정 함수
export const setCookie = (
  name: string,
  value: string,
  options: { path?: string; maxAge?: number } = {}
) => {
  let cookie = `${name}=${encodeURIComponent(value)};`

  if (options.path) {
    cookie += `path=${options.path};`
  }
  if (options.maxAge) {
    cookie += `Max-Age=${options.maxAge};`
  }

  document.cookie = cookie
}

// 쿠키 삭제 함수
export const removeCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`
}

// 쿠키 읽기 함수
export const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return matches ? decodeURIComponent(matches[1]) : null
}
