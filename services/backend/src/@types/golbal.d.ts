import type { UserResponseDTO } from 'src/user/user.dto'

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development'
    }
  }

  declare namespace Express {
    interface User extends UserResponseDTO {
      iat: number
      exp: number
    }
  }

  declare interface JwtPayload extends UserResponseDTO {
    iat: number
    exp: number
  }
}

declare module 'express-session' {
  interface SessionData {
    code: string
    uuid: `${string}-${string}-${string}-${string}`
  }
}

export {}
