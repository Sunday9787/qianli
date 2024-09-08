import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { QlHttpStatus } from '@/exception/http.exception'

type Response<T> = { data: T } | T

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    const http = context.switchToHttp()
    const request: Request = http.getRequest()

    if (request.url.indexOf('/api') > -1) {
      return next.handle().pipe(
        map(data => {
          return {
            data: data || null,
            code: QlHttpStatus.OK_REQUEST,
            message: 'success'
          }
        })
      )
    }

    return next.handle().pipe(
      map(data => {
        return data
      })
    )
  }
}
