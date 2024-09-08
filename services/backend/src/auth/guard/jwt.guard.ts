import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PROTECTED_KEY } from 'src/decorator/protected'
import { IS_PUBLIC_KEY } from 'src/decorator/public'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    Logger.log('进入:JwtAuthGuard canActivate')
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    const isProtected = this.reflector.getAllAndOverride<boolean>(IS_PROTECTED_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    Logger.verbose(isProtected ? '受保护' : isPublic ? '非受限' : '受限', '可访问性')
    Logger.verbose(isProtected ? 'frontend' : 'admin', '来自于')

    return isPublic || isProtected || super.canActivate(context)
  }
}
