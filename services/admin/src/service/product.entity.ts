import { AbstractEntity, type EntityJSON, type EntityQuery } from '@/class/abstractEntity'
import { Expose } from 'class-transformer'
import { ProductService } from './product.service'

export class ProductQueryEntity {
  /**产品标题 */
  title?: string
  /** 产品名称 */
  name?: string
  /** 产品分类 */
  category_id?: number
  created_start?: number
  created_end?: number
}

export type ProductEntityJSON = EntityJSON<ProductEntity>

export class ProductEntity extends AbstractEntity {
  private static service = new ProductService()

  public static from() {
    return new ProductQueryEntity()
  }

  public static select(data: EntityQuery<ProductQueryEntity & AppRequest.List>) {
    return ProductEntity.service.select(data)
  }

  public static del(id: number) {
    return ProductEntity.service.del(id)
  }

  @Expose() id: number
  @Expose() title!: string
  @Expose() name!: string
  @Expose() category_id!: number
  @Expose() category_name!: string
  updated!: string
  created!: string

  constructor(id = 0) {
    super()
    this.id = id
    this.init()
  }

  save() {
    return ProductEntity.service.save(this.toJSON())
  }
}
