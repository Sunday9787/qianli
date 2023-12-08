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
    uuid: `${string}-${string}-${string}-${string}`
  }
}
