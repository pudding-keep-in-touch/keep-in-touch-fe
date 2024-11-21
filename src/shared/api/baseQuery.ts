import { redirect } from 'next/navigation'
import axios from 'axios'
import { API_BASE_URL } from '../config/env'

export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
})

axiosInstance.interceptors.request.use(async (config) => {
  if (!config.headers) return config

  const accessToken = localStorage.getItem('keep_in_touch_token')
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

export const baseQuery = axiosInstance
