import { Expose, Transform } from 'class-transformer'
import { AbstractEntity, type EntityQuery } from '@/class/abstractEntity'
import { ProductService } from './product.service'
import { formatDate } from '@/utils'

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

export class ProductItemEntity {
  private static service = new ProductService()

  public static from() {
    return new ProductQueryEntity()
  }

  public static select(data: EntityQuery<ProductQueryEntity & AppRequest.List>) {
    return AbstractEntity.wrapper(ProductItemEntity, ProductItemEntity.service.select(data))
  }

  public static del(id: number) {
    return ProductItemEntity.service.del(id)
  }

  @Expose()
  id!: number
  @Expose()
  category_id!: number
  @Expose()
  category_name!: string
  @Expose()
  title!: string
  @Expose()
  name!: string

  @Transform(val => formatDate(val.value))
  readonly updated!: string

  @Transform(val => formatDate(val.value))
  readonly created!: string
}
