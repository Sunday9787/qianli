export class ProductBaseDTO {
  /**产品标题 */
  title: string
  /** 产品名称 */
  name: string
  /** 产品分类 */
  category_id: number
  /** 产品详情 */
  detail: string
  /** 产品视频 */
  media: string | null
}

export class ProductBaseEditDTO extends ProductBaseDTO {
  id: number
}
