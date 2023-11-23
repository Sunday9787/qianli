import * as jwt from 'jsonwebtoken'
import { Injectable, Inject } from '@nestjs/common'
import { RedisService } from '@/redis/redis.service'
import { UserLoginResponseDTO } from '@/user/user.dto'
import { JwtDTO } from './auth.jwt.dto'
import { TOKEN_SECRET } from '@/config'

@Injectable()
export class AuthService {
  /**
   * ! token 失效时间(毫秒)
   * ! 默认token 1小时后失效
   */
  static TOKEN_EXP_TIME = 60 * 60 * 1000

  static generateTokenKey<T extends { email: string }>(user: T) {
    return 'token:' + user.email
  }

  constructor(@Inject(RedisService) private readonly redisService: RedisService) {}

  async setToken(dto: UserLoginResponseDTO) {
    await this.redisService.cacheManager.set(
      AuthService.generateTokenKey(dto),
      JSON.stringify(dto),
      AuthService.TOKEN_EXP_TIME
    )
  }

  async removeToken(user: JwtDTO) {
    await this.redisService.cacheManager.del(AuthService.generateTokenKey(user))
  }

  async validateToken(token: string): Promise<null | JwtDTO> {
    const decoded = jwt.verify(token, TOKEN_SECRET) as JwtDTO

    if (decoded) {
      const result = await this.redisService.cacheManager.get(AuthService.generateTokenKey(decoded))
      if (result) return decoded
    }

    return null
  }
}
