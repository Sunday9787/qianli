import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TOKEN_SECRET } from '@/config'
import * as jwt from 'jsonwebtoken'
import { JwtDTO } from './user.jwt.dto'
import { Request } from 'express'

export const User = createParamDecorator(function (param: string | undefined, ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest<Request>()

  if (request.user) {
    return !!param ? request.user[param] : request.user
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = request.headers.authorization ? (request.headers.authorization as string).split(' ') : null
  if (token && token[1]) {
    const decoded = jwt.verify(token[1], TOKEN_SECRET) as JwtDTO
    return !!param ? decoded[param] : decoded
  }
})
