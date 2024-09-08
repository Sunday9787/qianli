import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import type { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { QlHttpException, QlHttpStatus } from 'src/exception/http.exception'

import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) readonly config: ConfigService<APPConfig>,
    @Inject(AuthService) readonly auth: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: config.get('JWT_SECRET')
    })
  }

  async validate(req: Request, payload: JwtPayload) {
    Logger.log('开始使用:JwtStrategy')
    Logger.verbose(`${payload.username} - ${payload.email}`, '用户名')
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    const hasToken = await this.auth.hasToken(token)

    if (!hasToken) {
      throw new QlHttpException('token 失效', QlHttpStatus.USER_TOKEN_INVALID)
    }

    return hasToken && payload
  }
}
