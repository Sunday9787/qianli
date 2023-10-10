import { Controller, Get, Render } from '@nestjs/common'
import { AppService } from './app.service'
import { LayoutService } from './layout/layout.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  render() {
    return this.appService.data()
  }
}
