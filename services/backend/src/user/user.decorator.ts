import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { type Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { getToken } from 'backend/tools'
import config from '@/config'
import { JwtDTO } from '@/auth/auth.jwt.dto'

export const User = createParamDecorator(function (param: string | undefined, ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest<Request>()

  if (request.user) {
    return !!param ? request.user[param] : request.user
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = getToken(request.headers.authorization)
  if (token) {
    const decoded = jwt.verify(token, config.GLOBAL.TOKEN_SECRET) as JwtDTO
    return !!param ? decoded[param] : decoded
  }
})
