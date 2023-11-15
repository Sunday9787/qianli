declare namespace Express {
  import { JwtDTO } from '@/auth/auth.jwt.dto'
  interface Request {
    user: JwtDTO
  }
}
