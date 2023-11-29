import { Expose } from 'class-transformer'

export class ProductFeatureEntity {
  @Expose() id = 0
  @Expose() title!: string
  @Expose() desc!: string
  @Expose() img!: string
  @Expose() product_id!: number

  closable = false
  readonly fileId = Symbol('feature')

  constructor(product_id: number) {
    this.product_id = product_id
  }
}
