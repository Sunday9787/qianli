import { ProductBaseDTO } from './detail/detail.dto'
import { ProductFileDTO } from './detail/detail.file.dto'
import { ProductSpecDTO, ProductSpecEditDTO } from './detail/detail.spec.dto'
import { ProductFeatureDTO, ProductFeatureEditDTO } from './detail/detail.feature.dto'
import { ProductScenarioDTO, ProductScenarioEditDTO } from './detail/detail.scenario.dto'

export class ProductDTO extends ProductBaseDTO {
  /** 产品图片 */
  img: ProductFileDTO[]
  /** 产品特点 */
  feature: ProductFeatureDTO[]
  /** 产品应用环境 */
  scenario: ProductScenarioDTO[]
  /** 产品规格 */
  spec: ProductSpecDTO[]
}

export class ProductAddDTO extends ProductBaseDTO {
  /** 产品图片 */
  img: string[]
  /** 产品特点 */
  feature: ProductFeatureDTO[]
  /** 产品应用环境 */
  scenario: ProductScenarioDTO[]
  /** 产品规格 */
  spec: ProductSpecDTO[]
}

export class ProductEditDTO extends ProductDTO {
  id: number
  img: ProductFileDTO[]
  feature: ProductFeatureEditDTO[]
  scenario: ProductScenarioEditDTO[]
  spec: ProductSpecEditDTO[]
}
