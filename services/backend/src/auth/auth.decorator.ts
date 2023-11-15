import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { getToken } from 'backend/tools'
import { type Request } from 'express'

export const AuthToken = createParamDecorator(function (param: undefined, ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest<Request>()
  // in case a route is not protected, we still want to get the optional auth user from jwt
  return getToken(request.headers.authorization)
})
