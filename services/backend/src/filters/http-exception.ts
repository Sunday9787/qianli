import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import type { Response, Request } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    Logger.log(exception.message, '错误提示')

    const errorResponse = {
      data: null,
      message: exception.message,
      code: exception.getStatus(),
      url: request.originalUrl
    }

    // 设置返回的状态码、请求头、发送错误信息
    response.status(200).json(errorResponse)
  }
}
