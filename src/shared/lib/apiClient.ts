import { redirect } from 'next/navigation'

const API_BASE_URL = 'http://dev-be.keep-in-touch.me:3000/'

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
