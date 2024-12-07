import { redirect } from 'next/navigation'
import axios from 'axios'
import { API_BASE_URL } from '../config/env'

export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
})

// 인증이 불필요할 때
export const publicQuery = axios.create({
  baseURL: `${API_BASE_URL}`,
})

axiosInstance.interceptors.request.use(async (config) => {
  if (!config.headers) return config

  const accessToken =
    typeof window !== 'undefined'
      ? localStorage.getItem('keep_in_touch_token')
      : null
  if (!accessToken) throw new Error('No accessToken')

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return config
})

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Handle global errors (e.g., unauthorized, server errors)
    if (error.response.status === 401) {
      redirect('/login')
    }
    throw new Error('API 요청 실패')
  }
)

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
