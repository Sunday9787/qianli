declare interface APPConfig {
  REDIS_HOST: string
  REDIS_PORT: number
  REDIS_DB: number

  DATA_BASE_HOST: string
  DATA_BASE_PORT: number
  DATA_BASE_USERNAME: string
  DATA_BASE_PASSWORD: string
  DATA_BASE_DATABASE: string

  SESSION_NAME: string
  SESSION_SECRET: string
  CORS_ORIGIN: string
  DOMAIN_RESOURCE: string
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
  JWT_REFRESH_EXPIRES_IN: number
}
