import { Expose, plainToInstance } from 'class-transformer'
import { AbstractEntity } from '@/class/abstractDTO'
import { CategoryService } from '@/api/common'

export class CategoryEntity extends AbstractEntity {
  private static readonly service = new CategoryService()
  static async select() {
    return plainToInstance(CategoryEntity, await CategoryEntity.service.select(), { excludeExtraneousValues: true })
  }

  constructor() {
    super()
    this.init()
  }

  @Expose() id = 0
  @Expose() category_name!: string
  @Expose() type!: 'product' | 'post'

  del() {
    return CategoryEntity.service.del(this.id)
  }

  save() {
    return CategoryEntity.service.save(this.toJSON())
  }
}
