import { Expose } from 'class-transformer'

export class ProductScenarioEntity {
  @Expose() id = 0
  @Expose() text!: string
  @Expose() img!: string
  @Expose() icon!: string
  @Expose() product_id!: number

  closable = false
  readonly fileId = Symbol('scenario')

  constructor(product_id: number) {
    this.product_id = product_id
  }
}
