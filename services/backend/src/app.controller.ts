import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, Render, UseInterceptors } from '@nestjs/common'

import { AppService } from './app.service'
import { Public } from './decorator/public'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @Render('index')
  @UseInterceptors(CacheInterceptor)
  render() {
    return this.appService.data()
  }
}
