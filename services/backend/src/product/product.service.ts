import { Inject, Injectable } from '@nestjs/common'
import { Between, EntityManager, Like, Repository } from 'typeorm'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { LayoutService } from '@/layout/layout.service'
import { QianliQuery } from '@/class/query'
import { ProductEntity } from './product.entity'
import { ProductDTO, ProductQueryListDTO, ProductResultListDTO } from './product.dto'
import { ProductFeatureEntity } from './detail/detail.feature.entity'
import { ProductScenarioEntity } from './detail/detail.scenario.entity'
import { ProductSpecEntity } from './detail/detail.spec.entity'
import { ProductFileEntity } from './detail/detail.file.entity'

import { CategoryDTO } from '@/common/category/category.dto'
import { CategoryEntity } from '@/common/category/category.entity'
import { ProductFeatureDTO } from './detail/detail.feature.dto'
import { ProductScenarioDTO } from './detail/detail.scenario.dto'
import { ProductSpecDTO } from './detail/detail.spec.dto'
import { ProductFileDTO } from './detail/detail.file.dto'
import { ProductBaseDTO } from './detail/detail.dto'

class RenderDTO extends CategoryDTO {
  id: number
  data: RenderProductDTO[]
}

class RenderProductDTO {
  id: number
  title: string
  name: string
  category_id: number
  img: string[]
}

function buildRenderDTO(data: CategoryEntity[]) {
  return data.map(function (item) {
    const dto = new RenderDTO()
    dto.id = item.id
    dto.category_name = item.category_name
    dto.data = item.product.map(buildRenderProductDTO)

    return dto
  })
}

function buildProductDTO(entity: ProductEntity) {
  const dto = new ProductDTO()
  dto.id = entity.id
  dto.title = entity.title
  dto.name = entity.name
  dto.category_id = entity.category_id
  dto.desc = entity.desc
  dto.img = entity.img
  dto.feature = entity.feature
  dto.scenario = entity.scenario
  dto.spec = entity.spec
  return dto
}

function buildRenderProductDTO(data: ProductEntity) {
  const dto = new RenderProductDTO()
  dto.id = data.id
  dto.title = data.title
  dto.name = data.name
  dto.category_id = data.category_id
  dto.img = data.img.map(img => img.path)

  return dto
}

@Injectable()
export class ProductService {
  constructor(
    @Inject(LayoutService)
    private readonly layoutService: LayoutService,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductFeatureEntity)
    private readonly productFeatureRepository: Repository<ProductFeatureEntity>,
    @InjectRepository(ProductScenarioEntity)
    private readonly productScenarioRepository: Repository<ProductScenarioEntity>,
    @InjectRepository(ProductSpecEntity)
    private readonly productSpecRepository: Repository<ProductSpecEntity>,
    @InjectRepository(ProductFileEntity)
    private readonly productFileRepository: Repository<ProductFileEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  all(query: ProductQueryListDTO) {
    const qianliQuery = new QianliQuery(query, function (entity: ProductEntity) {
      const dto = new ProductResultListDTO()
      dto.id = entity.id
      dto.created = entity.created
      dto.updated = entity.updated
      dto.category_id = entity.category_id
      dto.category_name = entity.category.category_name
      dto.title = entity.title
      dto.name = entity.name

      return dto
    })

    return this.productRepository
      .findAndCount({
        where: {
          category_id: query.category_id ? query.category_id : null,
          title: query.title ? Like(`%${query.title}%`) : null,
          name: query.name ? Like(`%${query.name}%`) : null,
          created:
            query.created_start && query.created_end
              ? Between(new Date(query.created_start), new Date(query.created_end))
              : null
        },
        relations: { category: true },
        ...qianliQuery.option
      })
      .then(function (result) {
        return qianliQuery.data(result)
      })
  }

  save(
    productBase: ProductBaseDTO,
    productFeature: ProductFeatureDTO[] | null,
    productScenario: ProductScenarioDTO[] | null,
    productSpec: ProductSpecDTO[],
    productFile: ProductFileDTO[]
  ) {
    return this.entityManager.transaction(async transactionalEntityManager => {
      /**
       * 保存 产品基础
       */
      const product = this.productRepository.create(productBase)
      await transactionalEntityManager.save(ProductEntity, product)

      /**
       * 保存 产品特点
       */
      if (productFeature) {
        for (const feature of productFeature) {
          const featureEntity = this.productFeatureRepository.create(feature)
          featureEntity.product = product
          await transactionalEntityManager.save(ProductFeatureEntity, featureEntity)
        }
      }

      /**
       * 保存 产品场景
       */
      if (productScenario) {
        for (const scenario of productScenario) {
          const scenarioEntity = this.productScenarioRepository.create(scenario)
          scenarioEntity.product = product
          await transactionalEntityManager.save(ProductScenarioEntity, scenarioEntity)
        }
      }

      /**
       * 保存 产品规格
       */
      for (const spec of productSpec) {
        const specEntity = this.productSpecRepository.create(spec)
        specEntity.product = product
        await transactionalEntityManager.save(ProductSpecEntity, specEntity)
      }

      /**
       * 保存 产品图片/video
       */
      for (const file of productFile) {
        const fileEntity = this.productFileRepository.create(file)
        fileEntity.product = product
        await transactionalEntityManager.save(ProductFileEntity, fileEntity)
      }
    })
  }

  del(id: number) {
    return this.productRepository.delete(id)
  }

  detail(id: number) {
    return this.productRepository
      .findOne({
        where: { id },
        relations: {
          category: true,
          img: true,
          feature: true,
          scenario: true,
          spec: true
        }
      })
      .then(buildProductDTO)
  }

  async data() {
    const layout = await this.layoutService.layout()
    const product: RenderDTO[] = await this.categoryRepository
      .find({
        relations: {
          product: {
            img: true
          }
        },
        where: {
          type: 'product'
        }
      })
      .then(buildRenderDTO)

    return {
      layout,
      product
    }
  }
}
