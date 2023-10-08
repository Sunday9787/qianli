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
      ],
      solveBanner: [
        { url: '/upload/20220614162623924193.png' },
        { url: '/upload/20220614162655906894.png' },
        { url: '/upload/20220614162729120996.png' },
        { url: '/upload/20220614162758407080.png' },
        { url: '/upload/20220614162825740490.png' }
      ],
      solveItem: [
        { title: '医院', icon: '/upload/20220614162610115260.png', translate: 'Hospital' },
        { title: '生物制药', icon: '/upload/20220614162610121779.png', translate: 'Biopharmaceutical' },
        { title: '实验室', icon: '/upload/20220614162610114322.png', translate: 'Biopharmaceutical' },
        { title: '急救中心', icon: '/upload/20220614162610114322.png', translate: 'Emergency center' },
        { title: '公共场所', icon: '/upload/20220614162610551710.png', translate: 'Public places' }
      ]
    }
  }
}
