import axios from 'axios'
import { API_BASE_URL } from '../config'

export const axiosInstance = axios.create({
  // withCredentials: true,
  baseURL: `${API_BASE_URL}`,
})

// Request interceptor
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
      window.location.href =
        'http://dev-be.keep-in-touch.me:3000/v1/auth/google/login'

      return Promise.reject(error)
    }
  }
)

export const baseQuery = axiosInstance
