import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  Req,
  Res,
  Session,
  UseGuards
} from '@nestjs/common'
import type { Request, Response } from 'express'
import type ExpressSession from 'express-session'
import svgCaptcha from 'svg-captcha'

import { AuthToken } from '@/decorator/auth'
import { Public } from '@/decorator/public'
import { User } from '@/decorator/user'
import { QlHttpException, QlHttpStatus } from '@/exception/http.exception'
import { UserEntity } from '@/user/user.entity'

import { AuthLocalDTO } from './auth.dto'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guard/local.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/svg+xml')
  @Get('code')
  createCaptcha(@Req() req: Request, @Res() res: Response) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 45,
      width: 100,
      height: 34,
      background: 'rgb(121,107,175)'
    })

    req.session.code = captcha.text
    res.send(captcha.data)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() body: AuthLocalDTO, @Session() session: ExpressSession.SessionData, @User() user: UserEntity) {
    Logger.debug(body.code, 'body.code')
    Logger.debug(session.code, 'session.code')

    if (body.code.toLocaleLowerCase() !== session.code?.toLocaleLowerCase()) {
      throw new QlHttpException('验证码错误', QlHttpStatus.BAD_REQUEST)
    }

    return this.authService.login(user)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@AuthToken() token?: string) {
    if (!token) {
      Logger.warn('token 异常登出')
      return
    }

    return this.authService.logout(token)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Query('token') token: string) {
    return this.authService.refreshToken(token)
  }
}
