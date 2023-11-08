declare namespace Express {
  import { JwtDTO } from '@/user/user.jwt.dto'
  interface Request {
    user: JwtDTO
  }
}
