import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { QlHttpException, QlHttpStatus } from 'src/exception/http.exception'

interface ResponseError {
  data: null
  timeStamp: string
  message: string
  code: QlHttpStatus
  url: string
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: QlHttpException | UnauthorizedException | NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    Logger.log(exception.message, '错误提示')
    Logger.error(exception.stack, 'Exception')

    const result: ResponseError = (function () {
      if (exception instanceof QlHttpException) {
        return {
          data: null,
          timeStamp: new Date().toISOString(),
          message: exception.message,
          code: exception.code,
          url: request.originalUrl
        }
      }

      if (exception instanceof NotFoundException) {
        return {
          data: null,
          timeStamp: new Date().toISOString(),
          message: 'url 不存在',
          code: QlHttpStatus.SOURCE_NOT_FOUND,
          url: request.originalUrl
        }
      }

      if (exception instanceof UnauthorizedException) {
        return {
          data: null,
          timeStamp: new Date().toISOString(),
          message: 'token 失效',
          code: QlHttpStatus.USER_TOKEN_INVALID,
          url: request.originalUrl
        }
      }

      return {
        data: null,
        timeStamp: new Date().toISOString(),
        message: '服务器内部错误',
        code: QlHttpStatus.INTERNAL_SERVER_ERROR,
        url: request.originalUrl
      }
    })()

    // 设置返回的状态码、请求头、发送错误信息
    response.status(200).json(result)
  }
}
