import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import type { Observable } from 'rxjs'
import type { Request } from 'express'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    // 读取token
    const authorization = request.header('authorization')

    if (!authorization) {
      throw new HttpException('未授权 请重新登录', HttpStatus.UNAUTHORIZED)
    }

    const token = authorization.split(' ')[1]

    if (!token) {
      throw new HttpException('未授权 请重新登录', HttpStatus.UNAUTHORIZED)
    }

    try {
      const user = this.userService.validateToken(token)

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
