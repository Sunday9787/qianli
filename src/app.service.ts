import { Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'

@Injectable()
export class AppService {
  constructor(private layoutService: LayoutService) {}
  data() {
    return {
      layout: this.layoutService.layout(),
      message: 'hello word',
      productBanner: [
        {
          model: 'Cubic 1000',
          title: '过氧化氢灭菌机器人',
          desc: '应用于制药车间洁净区、医院病房、公共消毒场所，单次最大灭菌空间1000m³',
          media: 'picture',
          url: '/upload/20220614162623924193.png'
        },
        {
          media: 'video',
          url: '/upload/2022080911373462f1d67e2fd41.mp4'
        },
        {
          model: 'FHP200',
          title: '便携式过氧化氢灭菌器',
          desc: '实验室、检测室灭菌，灭菌体积200立方米',
          media: 'picture',
          url: '/upload/20220809105908829373.png'
        }
      ],
      solveBanner: [
        { title: '医院', more: '灭菌方案', link: '/', url: '/upload/20220614162623924193.png' },
        { title: '生物制药', more: '灭菌方案', link: '/', url: '/upload/20220614162655906894.png' },
        { title: '实验室', more: '灭菌方案', link: '/', url: '/upload/20220614162729120996.png' },
        { title: '急救中心', more: '灭菌方案', link: '/', url: '/upload/20220614162758407080.png' },
        { title: '公共场所', more: '灭菌方案', link: '/', url: '/upload/20220614162825740490.png' }
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
