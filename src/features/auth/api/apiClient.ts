import { redirect } from 'next/navigation'
import { API_BASE_URL } from '../../../shared/config/env'

async function apiClient(
  endpoint: string,
  options: {
    headers?: {
      [key: string]: string
    }
  } = {}
) {
  const token = localStorage.getItem('keep_in_touch_token')

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    if (response.status === 401) {
      redirect('/login')
    }
    throw new Error('API 요청 실패')
  }

  return response.json()
}

export default apiClient
