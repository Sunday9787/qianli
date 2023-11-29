import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ProductBaseDTO } from './detail/detail.dto'
import { ProductFileDTO } from './detail/detail.file.dto'
import { ProductSpecDTO } from './detail/detail.spec.dto'
import { ProductFeatureDTO } from './detail/detail.feature.dto'
import { ProductScenarioDTO } from './detail/detail.scenario.dto'
import { ListQueryDTO } from '@/class/query'

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

export class ProductQueryListDTO extends ListQueryDTO {
  /**产品标题 */
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsNumber()
  created_start?: number

  @IsOptional()
  @IsNumber()
  created_end?: number

  /** 产品名称 */
  @IsOptional()
  @IsString()
  name?: string

  /** 产品分类 */
  @IsOptional()
  @IsNumber()
  category_id?: number
}

export class ProductResultListDTO {
  id: number
  title: string
  name: string
  created: Date
  updated: Date
  category_id: number
  category_name: string
}
