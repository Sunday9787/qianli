import { Controller, Get, Render } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: 'hello word',
      menus: [
        { title: '首页' },
        { title: '关于千立' },
        { title: '产品中心' },
        { title: '解决方案' },
        { title: '新闻动态' },
        { title: '联系我们' }
      ]
    }
  }
}
