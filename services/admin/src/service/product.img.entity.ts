import type { EntityJSON } from '@/class/abstractEntity'
import { Expose } from 'class-transformer'

export type ProductImgEntityJSON = EntityJSON<ProductImgEntity>

export class ProductImgEntity {
  @Expose() id = 0
  @Expose() path!: string
  @Expose() product_id!: number

  constructor(product_id: number) {
    this.product_id = product_id
  }
}
