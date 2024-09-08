import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import dayjs from 'dayjs'

import { QlHttpException, QlHttpStatus } from '@/exception/http.exception'
import { RedisService } from '@/redis/redis.service'
import { UserLoginResponseDTO, UserResponseDTO } from '@/user/user.dto'
import { UserEntity } from '@/user/user.entity'
import { UserService } from '@/user/user.service'

import { AuthLocalDTO } from './auth.dto'

@Injectable()
export class AuthService {
  static generateTokenKey(token: string) {
    return 'token:' + token
  }

  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(ConfigService) private readonly configService: ConfigService<APPConfig>
  ) {}

  signToken(user: UserEntity, refresh?: boolean) {
    const dto = plainToInstance(UserLoginResponseDTO, user, { excludeExtraneousValues: true })
    const data = instanceToPlain(dto)

    // refresh-token 设置更长的过期时间
    if (refresh) {
      return this.jwtService.sign(data, { expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') })
    }

    return this.jwtService.sign(data)
  }

  delToken(usr: UserLoginResponseDTO) {
    return this.redisService.cacheManager.del(AuthService.generateTokenKey(usr.access_token))
  }

  setToken(dto: UserLoginResponseDTO) {
    const JWT_EXPIRES_IN = this.configService.get('JWT_EXPIRES_IN') as string
    const num = (function () {
      const value = JWT_EXPIRES_IN.match(/\d+/)
      return value ? Number(value[0]) : 2
    })()

    const type = (function () {
      const value = JWT_EXPIRES_IN.match(/[a-zA-Z]+/)
      return (value ? value[0] : 'h') as dayjs.ManipulateType
    })()

    return this.redisService.cacheManager.set(
      AuthService.generateTokenKey(dto.access_token),
      dto,
      dayjs().add(num, type).unix() * 1e3 - Date.now()
    )
  }

  async hasToken(token?: string | null) {
    if (!token) return false
    const value = await this.redisService.cacheManager.get<UserLoginResponseDTO>(AuthService.generateTokenKey(token))
    return !!value
  }

  async login(user: UserEntity) {
    const dto = plainToInstance(UserLoginResponseDTO, user, { excludeExtraneousValues: true })

    dto.access_token = this.signToken(user)
    dto.refresh_token = this.signToken(user, true)

    await this.setToken(dto)

    return dto
  }

  validateUser(body: AuthLocalDTO) {
    return this.userService.findByEmail(body.email)
  }

  async logout(token: string) {
    const user = await this.redisService.cacheManager.get<UserLoginResponseDTO>(AuthService.generateTokenKey(token))

    if (token && user) {
      console.log(user)
      Logger.log(user.email, '退出登录邮箱')

      return await this.delToken(user)
    }

    Logger.warn('token user 异常登出')
  }

  async refreshToken(refreshToken: string) {
    try {
      // 验证 refresh_token
      const decoded: UserResponseDTO = this.jwtService.verify(refreshToken)
      const user = await this.userService.findById(decoded.id)

      if (!user) {
        throw new QlHttpException('用户不存在', QlHttpStatus.USER_NOT_FOUND)
      }

      const response: Pick<UserLoginResponseDTO, 'access_token'> = {
        access_token: this.signToken(user)
      }

      const dto = plainToInstance(UserLoginResponseDTO, user, { excludeExtraneousValues: true })
      dto.refresh_token = refreshToken
      dto.access_token = response.access_token

      await this.setToken(dto)

      return response
    } catch (error) {
      throw new QlHttpException('refresh_token 已过期', QlHttpStatus.USER_REFRESH_TOKEN_INVALID)
    }
  }
}
