import { Injectable } from '@nestjs/common'

@Injectable()
export class LayoutService {
  layout() {
    return {
      menus: [
        { title: '首页', url: '/' },
        { title: '关于千立', url: '/' },
        { title: '产品中心', url: '/product' },
        { title: '解决方案', url: '/' },
        { title: '新闻动态', url: '/' },
        { title: '联系我们', url: '/' }
      ]
    }
  }
}
