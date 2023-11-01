import { LayoutService } from '@/layout/layout.service'
import { Injectable } from '@nestjs/common'
import { DetailEntity } from './detail.entity'
import { loadYaml } from 'backend/tools'

const { details } = loadYaml<{ details: DetailEntity[] }>('/services/backend/data/product_detail.yaml')
const detailMap: Map<number, DetailEntity> = new Map(
  details.map(function (item, index) {
    return [index, item]
  })
)

@Injectable()
export class DetailService {
  constructor(private layoutService: LayoutService) {}

  data(id: number) {
    const detail = detailMap.get(id)

    return {
      layout: this.layoutService.layout(),
      breadcrumbs: [
        { label: '产品中心', link: '/product' },
        { label: '智能机器人系列', link: '/product?category=1' },
        { label: '过氧化氢灭菌机器人', link: '/product/detail?id=1' }
      ],
      detail
    }
  }
}
