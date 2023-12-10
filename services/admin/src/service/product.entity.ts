import type { AbstractEntityMethod, EntityJSON, EntityQuery, AbstractEntityDoUpload } from '@/class/abstractEntity'
import type { UploadCustomRequestOptions } from 'naive-ui'
import { UploadFileChunk } from '@/service/common.entity'
import { ProductScenarioEntity } from './product.scenario.entity'
import { ProductFeatureEntity } from './product.feature.entity'
import { ProductSpecEntity } from './product.spec.entity'
import { ProductImgEntity } from './product.img.entity'
import { AbstractEntity } from '@/class/abstractEntity'
import { Expose, Type } from 'class-transformer'
import { ProductService } from './product.service'
import { uploadProductImage } from './common.service'

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

export class ProductEntity extends AbstractEntity implements AbstractEntityMethod {
  private static service = new ProductService()

  public static feature = {
    create(id: number) {
      return new ProductFeatureEntity(id)
    }
  }

  public static spec = {
    create(id: number) {
      return new ProductSpecEntity(id)
    }
  }

  public static scenario = {
    create(id: number) {
      return new ProductScenarioEntity(id)
    }
  }

  public static from() {
    return new ProductQueryEntity()
  }

  public static select(data: EntityQuery<ProductQueryEntity & AppRequest.List>) {
    return ProductEntity.service.select(data)
  }

  public static del(id: number) {
    return ProductEntity.service.del(id)
  }

  public static detail(id: number) {
    return ProductEntity.service.detail(id)
  }

  @Expose() id: number
  @Expose() title!: string
  @Expose() name!: string
  @Expose() category_id!: number
  @Expose() desc!: string
  @Expose() media?: string

  @Expose()
  @Type(() => ProductImgEntity)
  img: ProductImgEntity[] = []

  @Expose()
  @Type(() => ProductFeatureEntity)
  feature: ProductFeatureEntity[] = []

  @Expose()
  @Type(() => ProductScenarioEntity)
  scenario: ProductScenarioEntity[] = []

  @Expose()
  @Type(() => ProductSpecEntity)
  spec: ProductSpecEntity[] = []

  readonly updated!: string
  readonly created!: string

  constructor(id = 0) {
    super()
    this.id = id
    this.init()
  }

  detail() {
    return ProductEntity.service.detail(this.id)
  }

  save() {
    return ProductEntity.service.save(this.toJSON())
  }

  upload(option: UploadCustomRequestOptions) {
    ProductEntity.doUpload(option, uploadProductImage as AbstractEntityDoUpload)
  }

  async uploadFile(options: UploadCustomRequestOptions) {
    const chunks = await UploadFileChunk.createChunk(options.file.file!)
    UploadFileChunk.uploadQueue(chunks, options)
  }
}
