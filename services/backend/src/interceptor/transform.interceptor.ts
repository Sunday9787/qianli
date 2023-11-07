import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Request } from 'express'

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
            code: 200,
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
