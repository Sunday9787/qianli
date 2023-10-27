export class ProductDTO {
  /** 产品分类 */
  category_id: number
  /** 产品标题 */
  title: string
  /** 产品介绍 */
  desc: string
  img: string
}

export class ProductEditDTO extends ProductDTO {
  id: number
}
