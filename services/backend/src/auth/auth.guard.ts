import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import type { Request } from 'express'
import { getToken } from 'backend/tools'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    // 读取token
    const authorization = request.header('authorization')

    if (!authorization) {
      throw new HttpException('未授权 请重新登录', HttpStatus.UNAUTHORIZED)
    }

    const token = getToken(authorization)

    if (!token) {
      throw new HttpException('未授权 请重新登录', HttpStatus.UNAUTHORIZED)
    }

    try {
      const user = await this.authService.validateToken(token)

      if (!user) {
        throw new HttpException('token失效 请重新登录', HttpStatus.UNAUTHORIZED)
      }

      request.user = user
    } catch {
      throw new HttpException('token失效 请重新登录', HttpStatus.UNAUTHORIZED)
    }

    return true
  }
}
