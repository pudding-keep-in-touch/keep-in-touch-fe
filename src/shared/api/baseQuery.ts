import axios from 'axios'
import { API_BASE_URL } from '../config/env'
import { getCookie, removeCookie } from '../utils/cookieUtils'
import { isTokenExpired } from '../utils/tokenUtils'

export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
})

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers) return config

  const accessToken = getCookie('keep_in_touch_token')

  if (!accessToken) {
    console.error('No access token available.')
    removeCookie('keep_in_touch_token')
    removeCookie('keep_in_touch_user_id')
    throw new Error('No access token available.')
  }

  if (isTokenExpired(accessToken)) {
    console.warn('Access token has expired. Logging out...')
    removeCookie('keep_in_touch_token')
    removeCookie('keep_in_touch_user_id')
    throw new Error('Access token expired.')
  }

  config.headers['Authorization'] = `Bearer ${accessToken}`
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API 요청 실패:', error)

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      alert('세션이 만료되었습니다. 다시 로그인해주세요.')
      removeCookie('keep_in_touch_token')
      removeCookie('keep_in_touch_user_id')
      window.location.href = '/login'
    }

    throw error
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
