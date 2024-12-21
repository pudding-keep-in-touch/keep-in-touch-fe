import { decodeJwt } from 'jose'

/**
 * JWT 토큰 만료 여부 확인 함수
 * @param token - 확인할 JWT 토큰
 * @returns 만료되었으면 true, 그렇지 않으면 false
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = decodeJwt(token) as { exp: number }
    const currentTime = Math.floor(Date.now() / 1000) // 현재 시간 (초 단위)
    return exp ? exp < currentTime : true
  } catch (error) {
    console.error('Invalid token:', error)
    return true // 토큰이 유효하지 않은 경우 만료된 것으로 간주
  }
}
