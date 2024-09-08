import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import type { Observable } from 'rxjs'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    Logger.log('进入:LocalAuthGuard canActivate')
    return super.canActivate(context)
  }
}
