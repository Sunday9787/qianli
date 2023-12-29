import type { AbstractEntityMethod, EntityJSON, AbstractEntityDoUpload } from '@/class/abstractEntity'
import type { UploadCustomRequestOptions } from 'naive-ui'
import { Expose, Type, Transform } from 'class-transformer'
import { AbstractEntity } from '@/class/abstractEntity'
import { UploadFileChunk } from '@/service/common.entity'
import { ProductScenarioEntity } from './product.scenario.entity'
import { ProductFeatureEntity } from './product.feature.entity'
import { ProductSpecEntity } from './product.spec.entity'
import { ProductImgEntity } from './product.img.entity'
import { ProductService } from './product.service'
import { uploadProductImage } from './common.service'
import { formatDate } from '@/utils'

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

  @Transform(val => formatDate(val.value))
  readonly updated!: string

  @Transform(val => formatDate(val.value))
  readonly created!: string

  constructor(id = 0) {
    super()
    this.id = id
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
