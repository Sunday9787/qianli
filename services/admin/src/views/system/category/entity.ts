import { Expose, plainToInstance } from 'class-transformer'
import { AbstractEntity } from '@/class/abstractDTO'
import { CategoryService } from '@/api/common'

export class CategoryEntity extends AbstractEntity<CategoryService> {
  constructor() {
    super(new CategoryService())
    this.init()
  }

  @Expose() id = 0
  @Expose() category_name!: string
  @Expose() type!: 'product' | 'post'

  async select() {
    return plainToInstance(CategoryEntity, await this.service.select(), { excludeExtraneousValues: true })
  }

  del() {
    return this.service.del(this.id)
  }

  save() {
    return this.service.save(this.toJSON())
  }

  create() {
    return this.service.create(this.toJSON())
  }
}
