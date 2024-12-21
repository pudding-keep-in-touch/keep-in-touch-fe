import { useRouter } from 'next/navigation'
import axios from 'axios'
import { API_BASE_URL } from '../config/env'

import { decodeJwt } from 'jose'
import { useCookies } from 'react-cookie'

// 기본 Axios 인스턴스
export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
})

// JWT 만료 여부 확인
const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = decodeJwt(token)
    const currentTime = Math.floor(Date.now() / 1000) // 현재 시간 (초 단위)
    return exp ? exp < currentTime : true
  } catch (error) {
    console.error('Invalid token:', error)
    return true
  }
}

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(async (config) => {
  if (!config.headers) return config

  const [cookies, , removeCookie] = useCookies([
    'keep_in_touch_token',
    'keep_in_touch_user_id',
  ])

  const accessToken = cookies.keep_in_touch_token

  if (!accessToken) {
    console.error('No access token available.')
    throw new Error('No access token available.')
  }

  // 토큰 만료 여부 확인
  if (isTokenExpired(accessToken)) {
    console.warn('Access token has expired. Logging out...')
    removeCookie('keep_in_touch_token')
    removeCookie('keep_in_touch_user_id')
    throw new Error('Access token expired.')
  }

  // Authorization 헤더에 토큰 추가
  config.headers['Authorization'] = `Bearer ${accessToken}`
  return config
})

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API 요청 실패:', error)

    if (axios.isAxiosError(error)) {
      if (error.response) {
        const router = useRouter()

        // 서버 오류 처리
        if (error.response.status >= 500) {
          alert('알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.')
        }

        // 인증 오류 처리
        if (error.response.status === 401) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.')

          // 로그아웃 처리
          const [, , removeCookie] = useCookies([
            'keep_in_touch_token',
            'keep_in_touch_user_id',
          ])
          removeCookie('keep_in_touch_token')
          removeCookie('keep_in_touch_user_id')
          router.push('/login')
        }
      }
    }

    throw new Error('API 요청 실패')
  }
)

// 인증이 불필요할 때
export const publicQuery = axios.create({
  baseURL: `${API_BASE_URL}`,
})

publicQuery.interceptors.response.use(
  (response) => {
    return response.data // 동일한 응답 처리
  },
  (error) => {
    console.error('Public API 요청 실패:', error)
    throw error // 필요한 경우, 비인증 요청도 오류 처리 추가
  }
)

export const baseQuery = axiosInstance
