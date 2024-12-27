type Env = 'production' | 'development'

export const APP_ENV: Env =
  process.env.APP_ENV === 'production' ? process.env.APP_ENV : 'development'

export const isProduction = APP_ENV === 'production'
export const isDev = APP_ENV === 'development'

export const API_BASE_URL = {
  production: process.env.PROD_WAS_ADDR,
  development: 'https://dev-be-v2.keep-in-touch.me/',
}[APP_ENV]

export const FRONT_API_BASE_URL = {
  production: 'https://www.keep-in-touch.me/',
  development: 'https://dev-fe-v2.keep-in-touch.me/',
}[APP_ENV]

export const LOCAL_URL = {
  production: 'https://localhost:3000/',
  development: 'https://localhost:3000/',
}[APP_ENV]

export const getLoginUrl = (redirectUrl: string) =>
  `${API_BASE_URL}?redirectUrl=${encodeURIComponent(
    `${window.location.origin}/v2/auth/google/callback?redirectUrl=${redirectUrl}`
  )}`
