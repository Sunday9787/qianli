import { Expose } from 'class-transformer'

export class ProductSpecEntity {
  @Expose() id = 0
  @Expose() label!: string
  @Expose() value!: string
  @Expose() product_id!: number
  closable = false

  constructor(product_id: number) {
    this.product_id = product_id
  }
}
