const env = process.env

export const PORT = Number(env.PORT)
export const DB_URL = String(env.DB_URL)

export const JWT_ACCESS_SECRET = String(env.JWT_ACCESS_SECRET)
export const JWT_REFRESH_SECRET = String(env.JWT_ACCESS_SECRET)

export const SMTP_HOST = String(env.SMTP_HOST)
export const SMTP_PORT = Number(env.SMTP_PORT)
export const SMTP_USER = String(env.SMTP_USER)
export const SMTP_PASSWORD = String(env.SMTP_PASSWORD)

export const API_URL = String(env.API_URL)
export const CLIENT_URL = String(env.CLIENT_URL)

export const GOOGLE_OAUTH_CLIENT_ID = String(env.GOOGLE_OAUTH_CLIENT_ID)
export const GOOGLE_OAUTH_CLIENT_SECRET = String(env.GOOGLE_OAUTH_CLIENT_SECRET)
export const GOOGLE_OAUTH_REDIRECT_URL = String(env.GOOGLE_OAUTH_REDIRECT_URL)
