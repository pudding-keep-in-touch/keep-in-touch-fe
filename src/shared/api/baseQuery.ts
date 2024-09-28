import axios from 'axios'

export const axiosInstance = axios.create({
  //   withCredentials: true,
  baseURL: 'http://dev-be.keep-in-touch.me:3000',
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Handle global errors (e.g., unauthorized, server errors)
    if (error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
    }
    return Promise.reject(error)
  }
)

export const baseQuery = axiosInstance
