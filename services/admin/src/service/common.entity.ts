import { Expose } from 'class-transformer'
import { AbstractEntity, type EntityJSON } from '@/class/abstractEntity'
import { CategoryService, DepartmentService } from './common.service'

export type CategoryEntityJSON = EntityJSON<CategoryEntity>

export class CategoryEntity extends AbstractEntity {
  private static readonly service = new CategoryService()

  public static typeMap = new Map<
    CategoryEntity['type'],
    { type: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'; label: string }
  >([
    ['post', { label: '文章分类', type: 'primary' }],
    ['product', { label: '产品分类', type: 'info' }]
  ])

  static select() {
    return CategoryEntity.service.select()
  }

  static del(id: number) {
    return CategoryEntity.service.del(id)
  }

  constructor() {
    super()
    this.init()
  }

  @Expose() id = 0
  @Expose() category_name!: string
  @Expose() type!: 'product' | 'post'

  save() {
    return CategoryEntity.service.save(this.toJSON())
  }

  copy(data: CategoryEntityJSON) {
    this.id = data.id
    this.category_name = data.category_name
    this.type = data.type
  }
}

export type DepartmentEntityJSON = EntityJSON<DepartmentEntity>

export class DepartmentEntity extends AbstractEntity {
  private static readonly service = new DepartmentService()

  static select() {
    return DepartmentEntity.service.select()
  }

  static del(id: number) {
    return DepartmentEntity.service.del(id)
  }

  @Expose() id = 0
  @Expose() department_name!: string

  constructor() {
    super()
    this.init()
  }

  save() {
    return DepartmentEntity.service.save(this.toJSON())
  }

  copy(data: DepartmentEntityJSON) {
    this.id = data.id
    this.department_name = data.department_name
  }
}
