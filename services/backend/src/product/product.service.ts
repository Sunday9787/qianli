import { Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'

@Injectable()
export class ProductService {
  constructor(private layoutService: LayoutService) {}

  data() {
    return {
      layout: this.layoutService.layout(),
      product: [
        {
          category: '智能机器人系列',
          id: 0,
          link: '/product?id=0',
          data: [
            { id: 0, title: '过氧化氢灭菌机器人', desc: 'Cubic 1000', img: '/upload/20220714104829899810.png' },
            { id: 1, title: '悬浮粒子采样机器人', desc: 'P1', img: '/upload/20220705181331698242.png' },
            { id: 2, title: '浮游菌采样机器人', desc: 'mic20', img: '/upload/20220819160523649805.png' }
          ]
        },
        {
          category: '灭菌系列产品',
          id: 1,
          link: '/product?id=1',
          data: [
            { id: 3, title: '固定式过氧化氢灭菌器', desc: 'FHP500', img: '/upload/20220626161544101013.png' },
            { id: 4, title: '便携式过氧化氢消毒机', desc: 'FHP200', img: '/upload/20220626161850879150.png' },
            { id: 5, title: '车载式过氧化氢消毒机', desc: 'FHP100', img: '/upload/20220626162349554840.png' },
            { id: 6, title: '管路式灭菌器', desc: 'ER-D系列', img: '/upload/20220706095036877990.png' },
            { id: 7, title: '脉冲强光灭菌器', desc: 'S1', img: '/upload/20220626162820141754.png' }
          ]
        },
        {
          category: '耗材系列',
          id: 2,
          link: '/product?id=2',
          data: [{ id: 8, title: '安瓿瓶开启器', desc: 'APM-3', img: '/upload/20220626163343794616.png' }]
        }
      ]
    }
  }
}
