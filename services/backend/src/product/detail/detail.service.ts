import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { LayoutService } from '@/layout/layout.service'
import { ProductEntity } from '../product.entity'
import { ProductBaseEditDTO } from './detail.dto'
import { ProductFeatureDTO } from './detail.feature.dto'
import { ProductScenarioDTO } from './detail.scenario.dto'
import { ProductSpecDTO } from './detail.spec.dto'

class RenderDetailDTO extends ProductBaseEditDTO {
  img: string[]
  category_name: string
  feature: ProductFeatureDTO[] | null
  scenario: ProductScenarioDTO[] | null
  spec: ProductSpecDTO[] | null
}

@Injectable()
export class DetailService {
  constructor(
    @Inject(LayoutService) private layoutService: LayoutService,
    @InjectRepository(ProductEntity) private detailRepository: Repository<ProductEntity>
  ) {}

  del(id: number) {
    return this.detailRepository.delete(id)
  }

  async data(id: number) {
    const layout = await this.layoutService.layout()
    const detail: RenderDetailDTO = await this.detailRepository
      .findOne({
        relations: { img: true, feature: true, scenario: true, spec: true, category: true },
        where: {
          id
        }
      })
      .then(function (product) {
        const renderDetailDTO = new RenderDetailDTO()
        renderDetailDTO.title = product.title
        renderDetailDTO.name = product.name
        renderDetailDTO.category_id = product.category_id
        renderDetailDTO.category_name = product.category.category_name
        renderDetailDTO.detail = product.detail
        renderDetailDTO.media = product.media
        renderDetailDTO.img = product.img.map(img => img.path)
        renderDetailDTO.scenario = product.scenario
        renderDetailDTO.feature = product.feature
        renderDetailDTO.spec = product.spec

        return renderDetailDTO
      })

    return {
      layout,
      breadcrumbs: [
        { label: '产品中心', link: '/product' },
        { label: detail.category_name, link: `/product?category=${detail.category_id}` },
        { label: detail.title }
      ],
      detail
    }
  }
}
