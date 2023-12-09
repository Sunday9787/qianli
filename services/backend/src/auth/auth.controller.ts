import { Controller, Get, Req, Header, HttpCode, HttpStatus, Res } from '@nestjs/common'
import type { Request, Response } from 'express'
import * as svgCaptcha from 'svg-captcha'

@Controller('auth')
export class AuthController {
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
}
