import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'
import { ExtractJwt } from 'passport-jwt'

export const AuthToken = createParamDecorator(function (param: undefined, ctx: ExecutionContext) {
  const req = ctx.switchToHttp().getRequest<Request>()
  // in case a route is not protected, we still want to get the optional auth user from jwt
  return ExtractJwt.fromAuthHeaderAsBearerToken()(req)
})
