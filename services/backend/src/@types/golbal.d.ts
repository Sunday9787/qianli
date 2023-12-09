import type { JwtDTO } from '@/auth/auth.jwt.dto'

declare global {
  declare namespace Express {
    interface Request {
      user: JwtDTO
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    code: string
    uuid: `${string}-${string}-${string}-${string}`
  }
}
