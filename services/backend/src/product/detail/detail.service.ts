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

function buildRenderDetailDTO(data: ProductEntity) {
  const dto = new RenderDetailDTO()
  dto.title = data.title
  dto.name = data.name
  dto.category_id = data.category_id
  dto.category_name = data.category.category_name
  dto.detail = data.detail
  dto.media = data.media
  dto.img = data.img.map(img => img.path)
  dto.scenario = data.scenario
  dto.feature = data.feature
  dto.spec = data.spec

  return dto
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
      .then(buildRenderDetailDTO)

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
