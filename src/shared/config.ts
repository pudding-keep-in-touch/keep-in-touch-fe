type Env = 'production' | 'development'

export const APP_ENV: Env =
  process.env.APP_ENV === 'production' ? process.env.APP_ENV : 'development'

export const isProduction = APP_ENV === 'production'
export const isDev = APP_ENV === 'development'

export const API_BASE_URL = {
  production: 'http://dev-be.keep-in-touch.me/', // FIXME: production 백엔드 서버 배포한 걸로 추가해야함
  development: 'http://dev-be.keep-in-touch.me:3000/',
}[APP_ENV]