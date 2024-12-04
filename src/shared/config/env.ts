type Env = 'production' | 'development'

export const APP_ENV: Env =
  process.env.APP_ENV === 'production' ? process.env.APP_ENV : 'development'

export const isProduction = APP_ENV === 'production'
export const isDev = APP_ENV === 'development'

export const API_BASE_URL = {
  production: 'https://dev-be-v2.keep-in-touch.me/', // FIXME: production 백엔드 서버 배포한 걸로 추가해야함
  development: 'https://dev-be-v2.keep-in-touch.me/',
}[APP_ENV]

export const FRONT_API_BASE_URL = {
  production: 'https://dev-be-v2.keep-in-touch.me/',
}

export const LOCAL_URL = {
  production: 'https://localhost:3000/', // FIXME: production 백엔드 서버 배포한 걸로 추가해야함
  development: 'https://localhost:3000/',
}[APP_ENV]

export const getLoginUrl = (redirectUrl: string) =>
  `${API_BASE_URL}?redirectUrl=${encodeURI(
    `${window.location.origin}/v2/auth/google/callback?redirectUrl=${redirectUrl}`
  )}`
